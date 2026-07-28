# Share 后端 Spring Boot → Go (Gin) 重写方案

## Context（背景与目标）

`e:\Spring\Share` 是一个局域网文件/文本共享工具：Spring Boot 4.0.3 + JPA 后端（实际用 H2，MySQL 配置已注释）+ Vue3/Vuetify 前端（已编译在 `web_v2/share_v3/dist`）。

用户目标：用 Go (Gin) 重写后端以**降低服务器内存占用**和**部署成本**（单文件二进制 + 内嵌前端），保留全部现有 API 不变，前端不动。默认 SQLite、保留 MySQL 选项。同时为 Spring 和 Go 两端各增加全表数据迁移接口，便于两者数据互迁。

### 已确认的关键事实（来自源码通读）
- 认证是 **HttpSession**（非 JWT）。`SecurityInterceptor`：IP 白名单放行，否则检查 session `login_user`。`LoginInterceptor`：仅检查 session。前端 `fetch` 用 `credentials:'include'`，Spring 实际未做 CSRF 校验。
- 端口 8081。前端 `SERVER_API_URL="/api"`，所有后端路由带 `/api` 前缀。前端是 **hash 路由**（`createWebHashHistory`），服务端无需 SPA fallback。
- 前端 Page 字段消费（已验证 `share-list.vue`/`file-list.vue`/`view-log-list.vue`）：只读 `content`、`page.totalElements`、`page.totalPages`、`page.size`。即 Spring `VIA_DTO` 模式产出 `{content, page:{size,number,totalElements,totalPages}}`。**Go 复刻此结构即可**，多余字段不需要。前端不读 `timestamp`，其格式无影响。
- AES 密钥每次启动随机（对齐 Spring `WebConstant.AES_KEY`），重启后旧公开分享链接失效——这是 Spring 原生行为。
- 构建：Go 1.22.3 / windows / **CGO_ENABLED=0** → 必须用纯 Go 的 SQLite 驱动。

## 技术选型（全部 CGO=0 可用）

| 依赖 | 用途 |
|---|---|
| `github.com/gin-gonic/gin` | Web 框架 |
| `gorm.io/gorm` + `github.com/glebarez/sqlite` | 默认 SQLite（纯 Go，底层 modernc.org/sqlite） |
| `gorm.io/driver/mysql` | 可选 MySQL |
| `github.com/gin-contrib/sessions` + `gin-contrib/sessions/memstore` | Session（内存，对齐 Spring 重启丢失语义） |
| `github.com/lionsoul2014/ip2region/binding/golang/xdb` | 离线 IP 库（注意是 **2014** 非 2012；xdb 为 v2 格式，pin commit 或用 v4 的版本探测） |
| `golang.org/x/crypto/bcrypt` | 密码哈希（对齐 Spring BCryptPasswordEncoder） |
| `gopkg.in/yaml.v3` | 配置解析（轻量，不引入 viper） |
| `github.com/google/uuid` | UUID 生成（去横线） |
| 标准库 | AES/ECB/PKCS5（`crypto/aes`+手写 PKCS5+`encoding/base64`）、SHA-256、`embed`、`time.Ticker` |

SQLite DSN 加 `?_journal=WAL&_busy_timeout=5000` 提升并发；写连接建议 `SetMaxOpenConns(1)`。

## Go 目录结构（`e:\Spring\Share\Go\`）

```
Go/
├── cmd/share-server/main.go        # 入口：配置→DB/缓存/searcher→路由→定时任务→启动
├── internal/
│   ├── config/config.go            # 配置结构+yaml加载+默认值（对齐 MyConfigProperties null 默认逻辑）
│   ├── model/                      # GORM 实体：user/share/file_message/disk_message/ip_data/tag/config_data/view_count_log/login_count/dto(PageResult/ResponseDetails/VditorFiles/ReturnCode)
│   ├── repository/                 # db.go(GORM初始化+AutoMigrate) + 各表 repo
│   ├── cache/                      # ip_cache/tag_cache/login_count_cache/ai_config_cache（对齐 Spring InMemory*）
│   ├── service/                    # user/share/file/public_share/view_count/move
│   ├── controller/                 # login_whitelist/share/file/public_share/ai/tag/view_count/move/test
│   ├── middleware/                 # security/login/header/recovery（对齐三个拦截器+ControllerAdvice）
│   ├── router/router.go            # 路由组+中间件挂载+NoRoute静态服务
│   └── utils/                      # aes/filepath/ip/password/response
├── assets/                         # go:embed 源（构建前拷贝 dist→assets/web/，xdb→assets/ip2region.xdb）
├── embed.go                        # //go:embed assets/web 与 assets/ip2region.xdb
├── config.yaml                     # 配置示例
├── go.mod / go.sum
└── Makefile 或 build.ps1           # 构建脚本（拷贝前端+xdb→assets，再 go build）
```

## 关键实现要点

### 1. 数据模型（表名/字段名与 Spring JPA 完全一致）
- 表名：`user_table`/`share_table`/`file_table`/`ip_table`/`tag_table`/`config_table`/`view_table`，`DiskMessage` 默认表名 `disk_message`。struct 上显式 `gorm:"column:xxx"` 避免隐式蛇形偏差。
- Java `long/Long`→`int64/*int64`；`Boolean`（装箱可空：`Share.lock/publicUser`、`FileMessage.publicUser`、`Tag.lock`）→`*bool`；`boolean`（基本类型不可空：`Share.haveUserSeeKey`、`FileMessage.haveUserSeeKey`）→`bool`。
- `User.oldPassword`、`Share.tag` 是 `@Transient`→`gorm:"-"` 但保留 json tag（响应里仍出现）。
- 时间戳全用毫秒 `time.Now().UnixMilli()`（int64）。
- `Share.data` 在 MySQL 用 `type:longtext`，SQLite 自动 TEXT。
- AutoMigrate 只增不删，安全。

### 2. 分页响应（已确认前端字段）
```go
type PageResult[T any] struct {
    Content []T      `json:"content"`
    Page    PageMeta `json:"page"`
}
type PageMeta struct {
    Size          int   `json:"size"`
    Number        int   `json:"number"`        // 0-based
    TotalElements int64 `json:"totalElements"`
    TotalPages    int   `json:"totalPages"`
}
```
GORM `Offset/Limit` + `Count` 填充。响应包 `{status,message,timestamp,page:PageResult}`（share/file list）或 `{...,data:PageResult}`（viewlog）。

### 3. 中间件与路由（精确复刻 Spring 拦截规则）
分层路由组（方案A）：
- **公开组** `/api`（无 security）：`/login`、`/ip`、`/login/check`、`/upload/disk`、`/upload/file/:date/*filename`、`/public/**`、`/ai/config`、`/ai/check`
- **受保护组** `/api` + securityMiddleware：`/share/*`、`/file/list`、`/upload/setting/filemax`、`/upload`、`/file/delete`、`/file/rename`、`/test`
- **管理员组** `/api/admin` + security+login：`/change/password`、`/whitelist*`、`/viewlog/list`、`/move/*`（含新增全表端点）
- **AI 受限组** `/api/ai` + security+login：`/invitation*`、`/save`（`/ai/config`、`/ai/check` 在公开组）
- 全局：`headerMiddleware`（`X-Frame-Options: SAMEORIGIN`）+ sessions + recovery
- securityMiddleware 逻辑：取 IP（代理开关）→ IP 白名单缓存命中放行；否则 session 有 `login_user` 放行，否则返回 `ResponseDetails.ok(0,"no login!")` 或 401。
- IP 获取：`is-the-proxy-configured=false` 时用 `c.Request.RemoteAddr`（strip 端口），**不要**用 `c.ClientIP()`（默认信任 XFF）。true 时复刻 `getProxyIpAddr` 头顺序。

### 4. 文件上传/下载
- 上传 `POST /api/upload`（multipart `files[]`, `type` 默认0）：存 `file/yyyy-MM-dd/uuid.ext`；**DB 存的 path 用 `/` 分隔**（用 `path.Join` 而非 `filepath.Join`，仅 os 操作时转 OS 路径，避免 Windows `\` 污染）。更新 DiskMessage（availableDisk-=size, userDisk+=size）。`type==1` 返回 wangeditor `{errno:0,data:{url,alt,href}}`；否则返回 VditorFiles `{msg,code,data:{succMap,errFiles}}`。
- 下载 `GET /api/upload/file/:date/*filename`：用 catch-all `*filename` 取 `strings.TrimPrefix`，避免带点文件名被截断。`checkSeePower`：有 `key`→AES 解密校验时间戳+IP（1小时内）；无 `key`→白名单IP或已登录。Content-Type 用 `mime.TypeByExtension`，Content-Disposition `type; filename=URL编码(name或filename)`（`url.QueryEscape` 与 Java URLEncoder 一致）。失败 404+JSON。
- 删除：删库+删盘+回滚磁盘占用+删空目录。返回 ReturnCodeEnum(200/2001)。

### 5. AES 工具（对齐 `AesUtil`）
SHA-256(密钥) 截前16字节 → AES/ECB/PKCS5Padding → Base64。密钥启动时随机 UUID 去横线，存全局变量。用于公开分享的 `userSeeKey`（加密 `时间戳#ip`）和下载鉴权 `key` 解密。

### 6. go:embed 与静态服务
- `embed.go`：`//go:embed assets/web` + `//go:embed assets/ip2region.xdb`。
- 构建脚本先把 `web_v2/share_v3/dist/*`→`Go/assets/web/`，`Share/ip2region.xdb`→`Go/assets/ip2region.xdb`。
- ip2region：`ip-db-path` 配置非空时读外部文件，否则用 embed（对齐 Spring 行为）。启动验证 `searcher.SearchByStr("1.2.3.4")` 非空。
- 静态服务用 `r.NoRoute`：路径以 `/api/` 开头→返回 JSON 404；否则从 `webFS` 读文件，读不到回退 `index.html`。**不要**用 `r.StaticFS("/",...)`（会吞 `/api`）。

### 7. 启动初始化（对齐 `WebConfig.dataLoader`）
- 全量加载 Tag 到缓存（list 中 password 置空）。
- 全量加载 IpData 到白名单 map；全量加载 ConfigData 到 AI 配置 map。
- 无 admin 用户则创建 `admin/123456`（bcrypt）。
- 打印本机网卡 IP。
- DiskMessage id=1：存在则刷新 availableDisk、补默认 uploadFileMax/editType；不存在则创建（userDisk=0, editType=0, availableDisk=根分区 FreeSpace, uploadFileMax=配置值）。

### 8. 定时任务（`time.Ticker`）
- 6 小时刷新 DiskMessage.availableDisk。
- 1 小时清理超过 1 小时的登录失败计数。

### 9. 统一数据迁移接口（Spring 和 Go 各加一份，对等）
新增端点（与现有 `/api/admin/move/share`、`/move/file` 共存，不破坏）：
- `GET /api/admin/move/all` → 导出全表：`{status,message,timestamp,data:{users,tags,configs,whitelist,viewlogs,disk,share,file}}`（disk 单例对象，其余数组；Tag.password 保留真实值）。
- `POST /api/admin/move/all/save` → 导入同结构 JSON，各表 upsert（GORM `clause.OnConflict{UpdateAll:true}` / JPA saveAll merge 语义），file 表导入后重算 DiskMessage.userDisk，整包事务。

### 10. 对 Spring 端的最小改动
仅修改 `Share/src/main/java/com/buguagaoshu/share/controller/MoveController.java`：注入 `UserRepository/TagRepository/ConfigRepository/IpRepository/ViewCountRepository/DiskMessageRepository`，新增上述两个全表端点（`@Transactional`）。不动实体、配置、拦截器。新端点落 `/api/admin/**` 自动受 LoginInterceptor 保护。

## 关键参考文件（Spring 端，逐一对照）
- [WebConfig.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/config/WebConfig.java) — 拦截器路径、启动初始化、404→index.html
- [SecurityInterceptor.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/config/SecurityInterceptor.java) + [LoginInterceptor.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/config/LoginInterceptor.java)
- [FileController.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/controller/FileController.java) — 上传/下载/checkSeePower/Content-Disposition
- [FileRepositoryInLocalDiskImpl.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/repository/impl/FileRepositoryInLocalDiskImpl.java) — 文件存储/磁盘回滚/rename 后缀
- [PublicShareServiceImpl.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/service/impl/PublicShareServiceImpl.java) — AES 加密 userSeeKey/ViewCountLog
- [AesUtil.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/utils/AesUtil.java)
- [ResponseDetails.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/domain/ResponseDetails.java) + [ReturnCodeEnum.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/enums/ReturnCodeEnum.java)
- [application.yml](file:///e:/Spring/Share/Share/src/main/resources/application.yml)

## 实现顺序
1. 骨架：go.mod、config、GORM+AutoMigrate、embed、memstore session、三中间件、NoRoute 静态服务。
2. 认证链路：/api/ip、/api/login、/api/login/check、白名单 CRUD、IP 缓存、login_count 缓存。
3. 核心业务：share list/save/delete、file list/upload/download/delete/rename、disk。
4. 公开分享 + AES + ViewCountLog + ip2region。
5. AI/Tag/ViewCountLog 控制器。
6. 迁移端点（Spring + Go）。
7. 定时任务。
8. 回归对照。

## 验证（端到端）
1. **构建**：`cd Go && go mod tidy && go build -o share-go.exe ./cmd/share-server`（CGO_ENABLED=0 应成功）。
2. **启动**：`./share-go.exe`，确认监听 8081、打印本机 IP、创建 admin/123456、生成 dist 可访问 `http://localhost:8081/` 加载前端。
3. **API 兼容**：浏览器登录 admin/123456 → 分享列表/文件列表分页正常（对照 Spring 响应的 `page.content`/`page.page.totalElements`）；上传文件→下载；创建公开分享→匿名访问；AI 邀请码；标签列表。
4. **迁移互导**：Spring 端 `GET /api/admin/move/all` 导出 JSON → Go 端 `POST /api/admin/move/all/save` 导入 → 重启 Go → 数据齐全；反向同理。磁盘 `file/` 目录手动拷贝。
5. **内存对照**：`go build` 单二进制运行，任务管理器对比 Spring JVM 内存占用（预期显著下降）。
6. **回归对照**：对同一份数据，逐接口比对 Spring 与 Go 的响应 JSON 字段（重点 Page 结构、Boolean null 三态、ReturnCodeEnum 数值）。
