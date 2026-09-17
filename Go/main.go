package main

import (
	"encoding/gob"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"share-go/internal/assets"
	"share-go/internal/cache"
	"share-go/internal/config"
	"share-go/internal/model"
	"share-go/internal/repository"
	"share-go/internal/router"
	"share-go/internal/service"
	"share-go/internal/utils"
)

// 版本信息，对齐 Spring pom.xml: share 3.8 / 局域网文本共享服务
// 开发时 go run 使用此处默认值；build.ps1 跨平台编译时通过 -ldflags -X 注入覆盖
var (
	AppName    = "Share"
	AppVersion = "3.8.1"
	AppDesc    = "局域网文本共享服务"
)

func init() {
	// memstore 使用 gob 深拷贝 session 值，需注册存入 session 的具体类型
	gob.Register(&model.User{})
}

func main() {
	// 0. 解析命令行参数
	resetPwd := flag.Bool("reset-password", false,
		"reset admin account to initial state (admin/123456) and exit, do not start server")
	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, "Share Go backend v%s\n\n", AppVersion)
		fmt.Fprintf(os.Stderr, "Usage: %s [options]\n\n", os.Args[0])
		fmt.Fprintf(os.Stderr, "Options:\n")
		flag.PrintDefaults()
		fmt.Fprintf(os.Stderr, "\nRun without options to start the server normally.\n")
	}
	flag.Parse()

	// 打印版本信息
	printVersion()

	// 重置密码模式：仅重置管理员账号后退出，不启动服务
	if *resetPwd {
		runResetPassword()
		return
	}

	// 1. 加载配置
	cfgPath := "config.yaml"
	if _, err := os.Stat(cfgPath); os.IsNotExist(err) {
		cfgPath = "" // 使用默认配置
	}
	cfg, err := config.Load(cfgPath)
	if err != nil {
		log.Fatalf("加载配置失败: %v", err)
	}

	gin.SetMode(gin.ReleaseMode)

	// 2. 初始化数据库
	db, err := repository.InitDB(cfg)
	if err != nil {
		log.Fatalf("初始化数据库失败: %v", err)
	}

	// 3. 初始化内存缓存（启动全量加载，对齐 Spring CommandLineRunner）
	ipCache := cache.NewIpCache(db)
	if err := ipCache.Init(); err != nil {
		log.Printf("警告：IP 白名单缓存初始化失败: %v", err)
	}
	tagCache := cache.NewTagCache(db)
	if err := tagCache.Init(); err != nil {
		log.Printf("警告：标签缓存初始化失败: %v", err)
	}
	aiConfigCache := cache.NewAiConfigCache(db)
	if err := aiConfigCache.Init(); err != nil {
		log.Printf("警告：AI 配置缓存初始化失败: %v", err)
	}
	loginCount := cache.NewLoginCountCache(cfg.Share.MaxLoginCount)

	// 4. 初始化 IP 地理位置查询（内嵌 xdb 或外部文件），对齐 Spring Searcher Bean
	var ipSearcher *utils.IpSearcher
	if cfg.Share.OpenIpAddress {
		if cfg.Share.IpDbPath != "" {
			ipSearcher, err = utils.NewIpSearcherFromFile(cfg.Share.IpDbPath)
		} else {
			ipSearcher, err = utils.NewIpSearcherFromBytes(assets.IpDbBytes)
		}
		if err != nil {
			log.Printf("警告：IP 地理位置库加载失败，将不返回地理位置: %v", err)
		}
	}

	// 5. 生成 AES 密钥（每次启动随机，对齐 Spring WebConstant.AES_KEY，重启后旧公开分享链接失效）
	aesKey := utils.NewUUID()

	// 6. 装配 Service 层
	userSvc := &service.UserService{DB: db}
	shareSvc := &service.ShareService{DB: db}
	fileSvc := &service.FileService{
		DB:        db,
		AesKey:    aesKey,
		IpCache:   ipCache,
		MaxFileMB: cfg.Share.MaxFileSizeMB,
	}
	viewCountSvc := &service.ViewCountService{
		DB:            db,
		SearchIp:      nil,
		OpenIpAddress: cfg.Share.OpenIpAddress,
	}
	if ipSearcher != nil {
		viewCountSvc.SearchIp = ipSearcher.Search
	}
	publicShareSvc := &service.PublicShareService{
		DB:           db,
		ShareService: shareSvc,
		ViewCount:    viewCountSvc,
		AesKey:       aesKey,
	}
	moveSvc := &service.MoveService{DB: db}

	// 7. 启动初始化：管理员账号 + 磁盘信息，对齐 Spring WebConfig.dataLoader
	initAdminUser(userSvc)
	initDiskMessage(db, cfg.Share.MaxFileSizeMB)

	// 8. 启动定时任务，对齐 Spring @Scheduled
	startScheduledTasks(loginCount, db)

	// 9. 打印本机 IP，对齐 Spring "当前系统IP为：..."
	printLocalIPs()

	// 10. 装配路由并启动服务
	deps := &router.Deps{
		Config:         cfg,
		IpCache:        ipCache,
		TagCache:       tagCache,
		AiConfigCache:  aiConfigCache,
		LoginCount:     loginCount,
		IpSearcher:     ipSearcher,
		IsProxy:        cfg.Share.IsTheProxyConfigured,
		OpenIpAddr:     cfg.Share.OpenIpAddress,
		UserService:    userSvc,
		ShareService:   shareSvc,
		FileService:    fileSvc,
		PublicShareSvc: publicShareSvc,
		ViewCountSvc:   viewCountSvc,
		MoveService:    moveSvc,
	}
	r := router.New(deps)

	addr := fmt.Sprintf(":%d", cfg.Server.Port)
	log.Printf("Share Go 后端启动，监听 %s，数据库驱动 %s", addr, cfg.Database.Driver)
	if err := r.Run(addr); err != nil && err != http.ErrServerClosed {
		log.Fatalf("服务启动失败: %v", err)
	}
}

// initAdminUser 初始化管理员账号，对齐 Spring WebConfig.dataLoader 中 admin 创建逻辑
func initAdminUser(userSvc *service.UserService) {
	admin, err := userSvc.FindByUsername("admin")
	if err != nil {
		log.Printf("警告：查询管理员账号失败: %v", err)
		return
	}
	if admin == nil {
		now := utils.NowMillis()
		u := &model.User{
			Username:   "admin",
			Password:   "123456",
			Nickname:   "admin",
			CreateTime: &now,
		}
		if err := userSvc.Save(u); err != nil {
			log.Printf("警告：创建管理员账号失败: %v", err)
		}
	}
}

// initDiskMessage 初始化/更新磁盘信息，对齐 Spring WebConfig.dataLoader 中 DiskMessage 逻辑
//   - 不存在则创建（id=1, userDisk=0, editType=0, availableDisk=当前可用空间, uploadFileMax=配置值）
//   - 存在则刷新 availableDisk，并补齐 null 字段
func initDiskMessage(db *gorm.DB, maxFileMB int64) {
	var dm model.DiskMessage
	free := utils.DiskFreeSpace(".")
	err := db.First(&dm, 1).Error
	if err == gorm.ErrRecordNotFound || dm.ID == 0 {
		zero := int64(0)
		et := 0
		dm = model.DiskMessage{
			ID:            1,
			UserDisk:      &zero,
			AvailableDisk: &free,
			UploadFileMax: &maxFileMB,
			EditType:      &et,
		}
		if err := db.Create(&dm).Error; err != nil {
			log.Printf("警告：创建磁盘信息失败: %v", err)
		}
		return
	}
	if err != nil {
		log.Printf("警告：查询磁盘信息失败: %v", err)
		return
	}
	dm.AvailableDisk = &free
	if dm.UploadFileMax == nil {
		dm.UploadFileMax = &maxFileMB
	}
	if dm.EditType == nil {
		et := 0
		dm.EditType = &et
	}
	if dm.UserDisk == nil {
		zero := int64(0)
		dm.UserDisk = &zero
	}
	if err := db.Save(&dm).Error; err != nil {
		log.Printf("警告：更新磁盘信息失败: %v", err)
	}
}

// updateAvailableDisk 刷新磁盘可用空间，对齐 Spring DiskMessageTasks.setAvailableDisk
func updateAvailableDisk(db *gorm.DB) {
	var dm model.DiskMessage
	if err := db.First(&dm, 1).Error; err != nil {
		return
	}
	free := utils.DiskFreeSpace(".")
	dm.AvailableDisk = &free
	db.Save(&dm)
}

// startScheduledTasks 启动定时任务，对齐 Spring @Scheduled
//   - LoginCountTasks.cleanLoginCount: 每 1 小时清理登录失败计数
//   - DiskMessageTasks.setAvailableDisk: 每 6 小时更新磁盘可用空间
func startScheduledTasks(loginCount *cache.LoginCountCache, db *gorm.DB) {
	// 登录失败计数清理：每 1 小时
	go func() {
		ticker := time.NewTicker(time.Hour)
		defer ticker.Stop()
		for range ticker.C {
			loginCount.Clean()
			log.Println("完成登录失败用户登录次数重置！")
		}
	}()

	// 磁盘可用空间更新：每 6 小时
	go func() {
		ticker := time.NewTicker(6 * time.Hour)
		defer ticker.Stop()
		for range ticker.C {
			updateAvailableDisk(db)
			log.Println("更新磁盘数据完成")
		}
	}()
}

// printLocalIPs 打印本机所有非回环 IPv4 地址，对齐 Spring WebConfig.getIpAddress()
func printLocalIPs() {
	ips := getLocalIPs()
	if ips == "" {
		log.Println("Share Go 后端已启动")
		return
	}
	log.Printf("当前系统IP为：\n%s", ips)
}

// printVersion 打印版本信息到控制台，对齐 Spring 启动横幅
func printVersion() {
	log.Println("========================================")
	log.Printf("  %s v%s (Go 后端)", AppName, AppVersion)
	log.Printf("  %s", AppDesc)
	log.Printf("  Go 运行时: %s %s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH)
	log.Println("========================================")
}

// runResetPassword 重置管理员账号为初始状态（admin / 123456）后退出，不启动服务
//   - id=1 的管理员存在：重置其用户名为 admin、密码为 123456
//   - id=1 不存在：创建初始管理员 admin / 123456
func runResetPassword() {
	log.Println("重置模式：将管理员账号恢复为初始状态（admin / 123456），不启动服务")

	cfgPath := "config.yaml"
	if _, err := os.Stat(cfgPath); os.IsNotExist(err) {
		cfgPath = ""
	}
	cfg, err := config.Load(cfgPath)
	if err != nil {
		log.Fatalf("加载配置失败: %v", err)
	}

	db, err := repository.InitDB(cfg)
	if err != nil {
		log.Fatalf("初始化数据库失败: %v", err)
	}

	var admin model.User
	err = db.First(&admin, 1).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		// id=1 不存在，创建初始管理员（Save 会自动哈希密码）
		now := utils.NowMillis()
		newAdmin := &model.User{
			Username:   "admin",
			Password:   "123456",
			Nickname:   "admin",
			CreateTime: &now,
		}
		userSvc := &service.UserService{DB: db}
		if err := userSvc.Save(newAdmin); err != nil {
			log.Fatalf("创建管理员账号失败: %v", err)
		}
		log.Println("管理员账号不存在，已创建初始管理员：admin / 123456")
	} else if err != nil {
		log.Fatalf("查询管理员账号失败: %v", err)
	} else {
		// 存在则重置用户名与密码为初始状态
		admin.Username = "admin"
		admin.Password = utils.Encode("123456")
		if err := db.Save(&admin).Error; err != nil {
			log.Fatalf("重置管理员密码失败: %v", err)
		}
		log.Println("管理员账号已重置为初始状态：admin / 123456")
	}

	log.Println("重置完成，请重新启动服务（不带 -reset-password 参数）")
}
