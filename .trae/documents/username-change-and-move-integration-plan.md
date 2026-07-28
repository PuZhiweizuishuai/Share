# 用户名修改、数据迁移整合与界面优化实施计划

## Context（背景）

当前系统存在四点不足：
1. 修改密码时无法修改用户名，账号一旦确定不可变更，安全性受限。
2. 数据迁移依赖独立的 `move.html`（粘贴 JSON 到 textarea），未集成到前端 Vue 应用，体验割裂。
3. 数据导出在页面 textarea 中展示，数据量大时造成浏览器卡顿；导入也靠手动粘贴。
4. 多个页面（sysinfo、file-list、qr-code、ai、aes、setting）布局零散，未充分利用 Vuetify 组件，间距与卡片结构不统一。

本计划在保持两个后端（Spring + Go）API 对等、前端 API 不变的前提下完成四项改造。

## 关键现状

- **用户模型**（两端对等）：`User { id, username, password, nickname, email, createTime, oldPassword(瞬态) }`，表 `user_table`。
  - Spring: [User.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/domain/User.java)
  - Go: [user.go](file:///e:/Spring/Share/Go/internal/model/user.go)
- **改密逻辑**：`changePassword(user)` 按 `username` 查库 → 校验 `oldPassword` → 更新 `password` → 清空 session。
  - Spring: [UserServiceImpl.java#L46-L62](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/service/impl/UserServiceImpl.java#L46-L62)
  - Go: [user_service.go#L52-L72](file:///e:/Spring/Share/Go/internal/service/user_service.go#L52-L72)
  - API：`POST /api/admin/change/password`（需登录），见 [login_whitelist.go#L83-L103](file:///e:/Spring/Share/Go/internal/controller/login_whitelist.go#L83-L103) 与 [LoginAndWhitelistController.java#L92-L100](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/controller/LoginAndWhitelistController.java#L92-L100)
- **数据迁移 API**（均需登录 `/api/admin/move/*`）：
  - `GET /api/admin/move/all` 导出全表；`POST /api/admin/move/all/save` 导入全表。
  - `MoveAllData { users, tags, configs, whitelist, viewlogs, disk, share, file }`，两端对等。
  - Go: [move.go](file:///e:/Spring/Share/Go/internal/controller/move.go)、[move_service.go](file:///e:/Spring/Share/Go/internal/service/move_service.go)
  - Spring: [MoveController.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/controller/MoveController.java)
- **move.html**：[move.html](file:///e:/Spring/Share/Share/src/main/resources/static/move.html)，独立页面，textarea 粘贴模式。
- **前端**：Vue3 + Vuetify3，全局 `httpGet/httpPost` 封装见 [main.js#L22-L55](file:///e:/Spring/Share/web_v2/share_v3/src/main.js#L22-L55)。
  - [sysinfo.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/sysinfo.vue)：登录卡 + IP白名单 + 改密 + 文件大小 + AI配置；改密区块在 L103-L154。
  - [setting.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/setting.vue)：编辑器选择（用了原生 fetch）。
  - [aes.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/aes.vue)、[qr-code.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/qr-code.vue)、[ai.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/ai.vue)、[file-list.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/file-list.vue)。

## 实施方案

### 第 1 部分：修改密码时支持修改用户名

**思路**：在 User 模型新增瞬态字段 `newUsername`。`changePassword` 校验旧密码通过后，若 `newUsername` 非空则一并更新 `username`。用户名为可选项，留空则只改密码，保持向后兼容。

**Spring 后端**：
- [User.java](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/domain/User.java)：新增 `@Transient private String newUsername;`（Lombok @Data 自动生成 getter/setter）。
- [UserServiceImpl.java#L46-L62](file:///e:/Spring/Share/Share/src/main/java/com/buguagaoshu/share/service/impl/UserServiceImpl.java#L46-L62) `changePassword`：在 `sys.setPassword(...)` 之前增加 `if (user.getNewUsername() != null && !user.getNewUsername().isEmpty()) { sys.setUsername(user.getNewUsername()); }`。

**Go 后端**：
- [user.go](file:///e:/Spring/Share/Go/internal/model/user.go)：新增 `NewUsername string \`gorm:"-" json:"newUsername"\``。
- [user_service.go#L52-L72](file:///e:/Spring/Share/Go/internal/service/user_service.go#L52-L72) `ChangePassword`：在 `sys.Password = utils.Encode(u.Password)` 之前增加 `if u.NewUsername != "" { sys.Username = u.NewUsername }`。

**前端**：
- [sysinfo.vue](file:///e:/Spring/Share/web_v2/share_v3/src/views/sysinfo.vue) 改密区块：在"账号"字段下方新增"新用户名（可选）"字段，绑定 `user.newUsername`；`data().user` 增加 `newUsername: ''`。

### 第 2 部分：将 move.html 功能整合到 sysinfo 页面

在 sysinfo.vue 登录后区域新增"数据迁移"卡片（复用现有 `/admin/move/*` 接口，登录态天然满足鉴权要求）：
- 顶部说明文字：用于 Spring 与 Go 后端之间迁移，磁盘文件需手动拷贝 `file/` 目录。
- 两个操作区：全表迁移（推荐）、单表迁移（Share/File）。

保留 `move.html` 不删除（兼容旧链接），但主入口改为 sysinfo。

### 第 3 部分：导出为文件下载、导入为文件上传

**导出**：调用 `GET /admin/move/all`（或 `/move/share`、`/move/file`）拿到 JSON 后，用 `Blob` + `URL.createObjectURL` + 隐藏 `<a download="share-data-时间戳.json">` 触发浏览器下载，不再写入 textarea。

**导入**：使用 Vuetify `<v-file-input accept=".json">`，`FileReader.readAsText` 读取文件 → `JSON.parse` → `POST /admin/move/all/save`（或对应单表 save 接口）。解析失败用 `v-snackbar` 提示。

抽出一个轻量内联辅助方法 `downloadJson(data, filename)` 与 `parseJsonFile(file)` 在 sysinfo.vue 内复用，不新建工具文件。

### 第 4 部分：界面布局优化（统一 Vuetify 风格）

统一规范：每个功能区用 `v-card` 包裹，`v-card-title` 放标题，`v-card-text` 放内容；外层 `v-container fluid`；按钮用 `v-row justify="center"` + `v-spacer`；表单字段统一 `variant="underlined"`；用 `v-alert` 替代裸 `<p>` 提示。

- **sysinfo.vue**：将登录、IP白名单、改密（含新用户名）、文件大小、AI配置、数据迁移（新）六块统一为 `v-card` 结构，标题用 `v-card-title`，去除裸 `<h2>` 与多余 `<v-col />` 占位。
- **setting.vue**：改用 `v-card` + `v-card-text`，复用全局 `httpGet/httpPost` 替换原生 fetch（与其它页一致），编辑器选择与文件大小配置合并展示。
- **aes.vue**：外层包 `v-card`，输入/密钥/结果用 `v-card-text` 分区，加密解密按钮用 `v-btn-group` 或 `v-row` 居中。
- **qr-code.vue**：`v-card` 居中 `max-width`，canvas 容器加 `v-card-text`，输入与按钮分区。
- **ai.vue**：已是 `v-card` + `v-tabs`，仅微调间距与按钮居中，邀请码 dialog 用 `v-card-actions`。
- **file-list.vue**：已用 `v-data-table-server`，仅把原生 fetch（initialize/getDiskMessage/reNameOk/deleteFile）统一为 `httpGet/httpPost`，保持表格结构不变。

> 说明：file-list.vue 改用全局封装仅为代码一致性，API 路径不变（`/file/list`、`/file/delete`、`/file/rename`、`/upload/disk`）。注意 `/file/delete` 是 DELETE 方法，全局 `httpPost` 不适用，保留原生 fetch 或在 main.js 新增 `httpDelete`。为减少改动面，file-list.vue 的 DELETE 保留原生 fetch，其余 GET/POST 改用封装。

## 需修改文件清单

**Spring 后端（2）**：
- `Share/src/main/java/com/buguagaoshu/share/domain/User.java`
- `Share/src/main/java/com/buguagaoshu/share/service/impl/UserServiceImpl.java`

**Go 后端（2）**：
- `Go/internal/model/user.go`
- `Go/internal/service/user_service.go`

**前端（6）**：
- `web_v2/share_v3/src/views/sysinfo.vue`（改密加用户名 + 数据迁移卡片 + 布局重构）
- `web_v2/share_v3/src/views/setting.vue`（布局 + 统一请求封装）
- `web_v2/share_v3/src/views/aes.vue`（布局）
- `web_v2/share_v3/src/views/qr-code.vue`（布局）
- `web_v2/share_v3/src/views/ai.vue`（微调）
- `web_v2/share_v3/src/views/file-list.vue`（统一请求封装）

不新建文件。`move.html` 保留不动。

## 验证方式

1. **后端编译**：
   - Go：`cd Go && go build ./...`
   - Spring：`cd Share && ./mvnw compile`（或 IDE 编译）
2. **改密改用户名**：登录 → sysinfo 改密区填写账号+旧密码+新用户名+新密码 → 提交 → 重新用新用户名登录成功。
3. **数据迁移**：登录 sysinfo → 数据迁移卡片 → 点"导出全部"浏览器下载 `share-data-*.json` → 在另一后端 sysinfo → "导入"选择该 json 文件 → 提示成功 → 核对 share/file 列表数据一致。
4. **前端构建**：`cd web_v2/share_v3 && npm run build`，无报错。
5. **页面布局**：逐页访问 sysinfo/setting/aes/qr-code/ai/file-list，检查卡片结构、间距、移动端响应式（窄屏）正常。
