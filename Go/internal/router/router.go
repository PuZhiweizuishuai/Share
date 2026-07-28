package router

import (
	"net/http"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	"github.com/gin-gonic/gin"
	"io/fs"

	"share-go/internal/assets"
	"share-go/internal/cache"
	"share-go/internal/config"
	"share-go/internal/controller"
	"share-go/internal/middleware"
	"share-go/internal/model"
	"share-go/internal/service"
	"share-go/internal/utils"
)

// Deps 路由依赖，由 main.go 装配后传入
type Deps struct {
	Config        *config.Config
	IpCache       *cache.IpCache
	TagCache      *cache.TagCache
	AiConfigCache *cache.AiConfigCache
	LoginCount    *cache.LoginCountCache
	IpSearcher    *utils.IpSearcher
	IsProxy       bool
	OpenIpAddr    bool

	UserService    *service.UserService
	ShareService   *service.ShareService
	FileService    *service.FileService
	PublicShareSvc *service.PublicShareService
	ViewCountSvc   *service.ViewCountService
	MoveService    *service.MoveService
}

// New 构建 gin 引擎，注册全部路由与中间件，对齐 Spring WebConfig 拦截器与各 Controller
func New(d *Deps) *gin.Engine {
	r := gin.New()
	// 全局中间件：panic 恢复 + X-Frame-Options + session
	r.Use(middleware.Recovery())
	r.Use(middleware.Header())

	store := memstore.NewStore([]byte(utils.NewUUID()))
	store.Options(sessions.Options{Path: "/", HttpOnly: true, MaxAge: 0})
	r.Use(sessions.Sessions(d.Config.Session.CookieName, store))

	// 构造控制器
	testCtrl := &controller.TestController{}
	loginCtrl := &controller.LoginController{
		IpCache:       d.IpCache,
		UserService:   d.UserService,
		LoginCount:    d.LoginCount,
		SearchIp:      nil,
		OpenIpAddress: d.OpenIpAddr,
		IsProxy:       d.IsProxy,
	}
	if d.IpSearcher != nil {
		loginCtrl.SearchIp = d.IpSearcher.Search
	}
	shareCtrl := &controller.ShareController{ShareService: d.ShareService}
	fileCtrl := &controller.FileController{FileService: d.FileService, IsProxy: d.IsProxy}
	tagCtrl := &controller.TagController{Cache: d.TagCache}
	viewCtrl := &controller.ViewCountController{Service: d.ViewCountSvc}
	moveCtrl := &controller.MoveController{DB: nil, MoveService: d.MoveService}
	pubShareCtrl := &controller.PublicShareController{Service: d.PublicShareSvc, IsProxy: d.IsProxy}
	aiCtrl := &controller.AiController{
		Cache:     d.AiConfigCache,
		ViewCount: d.ViewCountSvc,
		IsProxy:   d.IsProxy,
	}

	// ===== 公开接口（不经过 SecurityInterceptor）=====
	// 对齐 Spring excludePathPatterns: /api/login, /api/ip, /api/upload/disk,
	// /api/upload/file/**, /api/public/**, /api/login/check, /api/ai/config, /api/ai/check
	pub := r.Group("/api")
	{
		pub.GET("/test", testCtrl.Name)
		pub.GET("/ip", loginCtrl.GetIp)
		pub.GET("/login/check", loginCtrl.LoginCheck)
		pub.POST("/login", loginCtrl.Login)
		pub.GET("/upload/disk", fileCtrl.DiskMessage)
		// 文件下载 /api/upload/file/:date/*filename，对齐 {date}/{filename:.+}
		pub.GET("/upload/file/:date/*filename", fileCtrl.Get)
		// AI 公开接口
		pub.POST("/ai/config", aiCtrl.GetAiConfig)
		pub.GET("/ai/check", aiCtrl.CheckAiPower)
		// 公开分享
		pub.POST("/public/share", pubShareCtrl.CreatePublicShare)
		pub.POST("/public/file", pubShareCtrl.CreatePublicFile)
		pub.POST("/public/share/cancel", pubShareCtrl.CancelPublicShare)
		pub.POST("/public/file/cancel", pubShareCtrl.CancelPublicFile)
		pub.POST("/public/share/get", pubShareCtrl.GetShare)
		pub.POST("/public/file/get", pubShareCtrl.GetFile)
		pub.GET("/public/share/check", pubShareCtrl.CheckShare)
		pub.GET("/public/file/check", pubShareCtrl.CheckFile)
	}

	// ===== Security 拦截接口（IP 白名单或登录）=====
	sec := r.Group("/api", middleware.Security(d.IpCache, d.IsProxy))
	{
		sec.GET("/share/list", shareCtrl.List)
		sec.POST("/share/save", shareCtrl.Save)
		sec.POST("/share/delete", shareCtrl.Delete)
		sec.POST("/share/update", shareCtrl.Update)

		sec.POST("/upload/setting/filemax", fileCtrl.UploadFileMax)
		sec.POST("/upload", fileCtrl.Upload)
		sec.GET("/file/list", fileCtrl.LoadAll)
		sec.DELETE("/file/delete", fileCtrl.Delete)
		sec.POST("/file/rename", fileCtrl.Rename)

		sec.GET("/tag/list", tagCtrl.GetTagList)
		sec.POST("/tag/save", tagCtrl.Save)

		// ===== Login 拦截接口（必须登录）=====
		// 对齐 Spring LoginInterceptor: /api/admin/**, /api/ai/invitation/**, /api/ai/invitation, /api/ai/save
		admin := sec.Group("/admin", middleware.Login())
		{
			admin.POST("/change/password", loginCtrl.ChangePassword)
			admin.POST("/whitelist/add", loginCtrl.AddWhitelist)
			admin.POST("/whitelist/delete", loginCtrl.DeleteWhitelist)
			admin.GET("/whitelist", loginCtrl.GetWhitelist)
			admin.GET("/viewlog/list", viewCtrl.GetViewCountLog)
			// 数据迁移
			admin.GET("/move/share", moveCtrl.MoveShare)
			admin.GET("/move/file", moveCtrl.MoveFile)
			admin.POST("/move/share/save", moveCtrl.SaveShare)
			admin.POST("/move/file/save", moveCtrl.SaveFile)
			admin.GET("/move/all", moveCtrl.MoveAll)
			admin.POST("/move/all/save", moveCtrl.SaveAll)
		}

		// AI 需登录的接口（/api/ai/save, /api/ai/invitation, /api/ai/invitation/**）
		aiLogin := sec.Group("", middleware.Login())
		{
			aiLogin.POST("/ai/save", aiCtrl.SetAiConfig)
			aiLogin.POST("/ai/invitation", aiCtrl.CreateAiInvitationCode)
			aiLogin.GET("/ai/invitation/list", aiCtrl.ListAiInvitationCode)
			aiLogin.POST("/ai/invitation/delete", aiCtrl.DeleteAiInvitationCode)
		}
	}

	// ===== 前端静态资源（内嵌 web/dist）=====
	registerStatic(r)

	return r
}

// registerStatic 注册前端静态资源与 SPA 回退，对齐 Spring 404→/index.html 行为。
// 全部通过 NoRoute 处理：/api/* 返回 JSON 404，存在的静态文件直接服务，其余回退 index.html。
func registerStatic(r *gin.Engine) {
	webFS, err := fs.Sub(assets.WebFS, "web")
	if err != nil {
		r.NoRoute(func(c *gin.Context) {
			c.JSON(http.StatusNotFound, model.OkWithCode(404, "前端资源未内嵌，请先运行构建脚本"))
		})
		return
	}

	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		// API 未匹配路由返回 JSON 404
		if strings.HasPrefix(path, "/api/") {
			c.JSON(http.StatusNotFound, model.OkWithCode(404, "no such route"))
			return
		}
		// 尝试从内嵌前端资源服务对应文件（/assets/*, /emoji/*, /favicon.ico, /move.html …）
		name := strings.TrimPrefix(path, "/")
		if name != "" {
			if f, err := webFS.Open(name); err == nil {
				stat, sErr := f.Stat()
				f.Close()
				if sErr == nil && !stat.IsDir() {
					http.ServeFileFS(c.Writer, c.Request, webFS, name)
					return
				}
			}
		}
		// SPA 回退到 index.html，对齐 Spring ErrorPage(404, "/index.html")
		http.ServeFileFS(c.Writer, c.Request, webFS, "index.html")
	})
}
