package controller

import (
	"log"
	"net/http"
	"net/url"
	"os"
	"path"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"share-go/internal/cache"
	"share-go/internal/middleware"
	"share-go/internal/model"
	"share-go/internal/service"
	"share-go/internal/utils"
)

// FileController 对齐 Spring FileController
type FileController struct {
	FileService *service.FileService
	IpCache     *cache.IpCache
	IsProxy     bool
}

// actor 返回当前请求的操作者标识：已登录返回用户名，未登录用户名为空；同时返回客户端 IP
func (f *FileController) actor(c *gin.Context) (username, ip string) {
	ip = utils.GetIpAddr(c.Request, f.IsProxy)
	if user := middleware.CurrentUser(c); user != nil {
		username = user.Username
	}
	return
}

// DiskMessage GET /api/upload/disk
func (f *FileController) DiskMessage(c *gin.Context) {
	dm, err := f.FileService.DiskMessage()
	if err != nil {
		log.Printf("[ERROR] [DiskMessage] %v", err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	// 隐私保护：未登录且非白名单 IP 的访客不返回磁盘已用/剩余空间
	if !middleware.Trusted(c, f.IpCache, f.IsProxy) {
		log.Printf("[INFO] [DiskMessage] guest ip=%s, hide disk usage", utils.GetIpAddr(c.Request, f.IsProxy))
		dm.UserDisk = new(int64)
		dm.AvailableDisk = new(int64)
	}
	c.JSON(200, model.Ok().Put("data", dm))
}

// UploadFileMax POST /api/upload/setting/filemax?type=
func (f *FileController) UploadFileMax(c *gin.Context) {
	var body model.DiskMessage
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(200, model.OkWithMessage("提交数据错误，请检查后重试！"))
		return
	}
	typ := c.Query("type")
	ip := utils.GetIpAddr(c.Request, f.IsProxy)
	disked, err := f.FileService.DiskMessage()
	if err != nil {
		log.Printf("[ERROR] [UploadFileMax] ip=%s %v", ip, err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	user := middleware.CurrentUser(c)
	username := ""
	if user != nil {
		username = user.Username
	}
	if typ == "setting" {
		disked.EditType = body.EditType
		msg := f.FileService.UploadFileMax(disked)
		log.Printf("[INFO] [UploadFileMax] user=%s ip=%s type=setting result=%s", username, ip, msg)
		c.JSON(200, model.OkWithMessage(msg))
		return
	}
	if user != nil && user.Username == "admin" {
		disked.UploadFileMax = body.UploadFileMax
		msg := f.FileService.UploadFileMax(disked)
		log.Printf("[INFO] [UploadFileMax] user=%s ip=%s type=filemax result=%s", username, ip, msg)
		c.JSON(200, model.OkWithMessage(msg))
		return
	}
	log.Printf("[WARN] [UploadFileMax] user=%s ip=%s no permission or no-op", username, ip)
	c.JSON(200, model.Ok().Put("data", disked))
}

// Upload POST /api/upload （multipart files[], type 默认 0）
func (f *FileController) Upload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		log.Printf("[WARN] [Upload] ip=%s parse form failed: %v", utils.GetIpAddr(c.Request, f.IsProxy), err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	files := form.File["files"]
	typeStr := c.DefaultPostForm("type", "0")
	tp, _ := strconv.Atoi(typeStr)

	username, ip := f.actor(c)
	vditor := f.FileService.Save(files)
	succMap, _ := vditor.Data["succMap"].(map[string]string)
	errFiles, _ := vditor.Data["errFiles"].([]string)
	log.Printf("[INFO] [Upload] user=%s ip=%s total=%d success=%d failed=%d type=%d",
		username, ip, len(files), len(succMap), len(errFiles), tp)
	if tp == 1 {
		// wangeditor 格式
		data := map[string]string{}
		for name, u := range succMap {
			data["url"] = u
			data["alt"] = name
			data["href"] = u
		}
		c.JSON(200, gin.H{"errno": 0, "data": data})
		return
	}
	c.JSON(200, vditor)
}

// LoadAll GET /api/file/list
func (f *FileController) LoadAll(c *gin.Context) {
	page := atoiDefault(c.Query("page"), 1)
	size := atoiDefault(c.Query("size"), 20)
	key := c.Query("key")
	res, err := f.FileService.LoadAll(page, size, key)
	if err != nil {
		log.Printf("[ERROR] [LoadAll] page=%d size=%d key=%s %v", page, size, key, err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("page", res))
}

// ListPublic GET /api/shared/file/list 已共享文件列表（需登录）
func (f *FileController) ListPublic(c *gin.Context) {
	page := atoiDefault(c.Query("page"), 1)
	size := atoiDefault(c.Query("size"), 20)
	res, err := f.FileService.LoadPublicFiles(page, size)
	if err != nil {
		log.Printf("[ERROR] [ListPublic] page=%d size=%d %v", page, size, err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("page", res))
}

// Delete DELETE /api/file/delete
func (f *FileController) Delete(c *gin.Context) {
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		log.Printf("[WARN] [Delete] ip=%s bind failed: %v", utils.GetIpAddr(c.Request, f.IsProxy), err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	username, ip := f.actor(c)
	status := f.FileService.Delete(&fm)
	log.Printf("[INFO] [Delete] user=%s ip=%s id=%v name=%s status=%d", username, ip, fm.ID, fm.UploadFilename, status)
	c.JSON(200, model.OkStatus(status))
}

// Rename POST /api/file/rename
func (f *FileController) Rename(c *gin.Context) {
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		log.Printf("[WARN] [Rename] ip=%s bind failed: %v", utils.GetIpAddr(c.Request, f.IsProxy), err)
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	username, ip := f.actor(c)
	status := f.FileService.Rename(&fm)
	log.Printf("[INFO] [Rename] user=%s ip=%s id=%v name=%s status=%d", username, ip, fm.ID, fm.UploadFilename, status)
	c.JSON(200, model.OkStatus(status))
}

// Get GET /api/upload/file/:date/*filename
func (f *FileController) Get(c *gin.Context) {
	date := c.Param("date")
	filename := strings.TrimPrefix(c.Param("filename"), "/")
	name := c.Query("filename")
	typ := c.Query("type")
	key := c.Query("key")

	log.Printf("[INFO] [Get] date=%s file=%s name=%s type=%s key=%s", date, filename, name, typ, key)

	ip := utils.GetIpAddr(c.Request, f.IsProxy)
	user := middleware.CurrentUser(c)
	loggedIn := user != nil
	username := ""
	if user != nil {
		username = user.Username
	}

	if !f.FileService.CheckSeePower(key, ip, loggedIn) {
		log.Printf("[WARN] [Get] access denied user=%s ip=%s date=%s file=%s", username, ip, date, filename)
		c.JSON(http.StatusNotFound, model.OkWithCode(404, "没有找到相应的资源！").Put("error", "no power!"))
		return
	}
	relPath := path.Join(utils.ROOT, date, filename)
	absPath := utils.OsPath(relPath)
	if _, err := os.Stat(absPath); err != nil {
		log.Printf("[WARN] [Get] file not found user=%s ip=%s path=%s err=%v", username, ip, relPath, err)
		c.JSON(http.StatusNotFound, model.OkWithCode(404, "没有找到相应的资源！").Put("error", err.Error()))
		return
	}
	log.Printf("[INFO] [Get] user=%s ip=%s date=%s file=%s type=%s", username, ip, date, filename, typ)
	c.Header("Content-Type", service.ContentType(filename))
	display := filename
	if name != "" {
		display = url.QueryEscape(name)
	}
	c.Header("Content-Disposition", typ+"; filename="+display)
	// 上传文件以 date/filename 寻址，路径内容视为不可变，启用浏览器长缓存以避免每次重新拉取
	c.Header("Cache-Control", "public, max-age=604800")
	c.File(absPath)
}
