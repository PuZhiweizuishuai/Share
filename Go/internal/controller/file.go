package controller

import (
	"net/http"
	"net/url"
	"os"
	"path"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"share-go/internal/middleware"
	"share-go/internal/model"
	"share-go/internal/service"
	"share-go/internal/utils"
)

// FileController 对齐 Spring FileController
type FileController struct {
	FileService *service.FileService
	IsProxy     bool
}

// DiskMessage GET /api/upload/disk
func (f *FileController) DiskMessage(c *gin.Context) {
	dm, err := f.FileService.DiskMessage()
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
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
	disked, err := f.FileService.DiskMessage()
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if typ == "setting" {
		disked.EditType = body.EditType
		c.JSON(200, model.OkWithMessage(f.FileService.UploadFileMax(disked)))
		return
	}
	user := middleware.CurrentUser(c)
	if user != nil && user.Username == "admin" {
		disked.UploadFileMax = body.UploadFileMax
		c.JSON(200, model.OkWithMessage(f.FileService.UploadFileMax(disked)))
		return
	}
	c.JSON(200, model.Ok().Put("data", disked))
}

// Upload POST /api/upload （multipart files[], type 默认 0）
func (f *FileController) Upload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	files := form.File["files"]
	typeStr := c.DefaultPostForm("type", "0")
	tp, _ := strconv.Atoi(typeStr)

	vditor := f.FileService.Save(files)
	if tp == 1 {
		// wangeditor 格式
		succMap, _ := vditor.Data["succMap"].(map[string]string)
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
	res, err := f.FileService.LoadAll(page, size)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("page", res))
}

// Delete DELETE /api/file/delete
func (f *FileController) Delete(c *gin.Context) {
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.OkStatus(f.FileService.Delete(&fm)))
}

// Rename POST /api/file/rename
func (f *FileController) Rename(c *gin.Context) {
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.OkStatus(f.FileService.Rename(&fm)))
}

// Get GET /api/upload/file/:date/*filename
func (f *FileController) Get(c *gin.Context) {
	date := c.Param("date")
	filename := strings.TrimPrefix(c.Param("filename"), "/")
	name := c.Query("filename")
	typ := c.Query("type")
	key := c.Query("key")

	ip := utils.GetIpAddr(c.Request, f.IsProxy)
	loggedIn := middleware.CurrentUser(c) != nil

	if !f.FileService.CheckSeePower(key, ip, loggedIn) {
		c.JSON(http.StatusNotFound, model.OkWithCode(404, "没有找到相应的资源！").Put("error", "no power!"))
		return
	}
	relPath := path.Join(utils.ROOT, date, filename)
	absPath := utils.OsPath(relPath)
	if _, err := os.Stat(absPath); err != nil {
		c.JSON(http.StatusNotFound, model.OkWithCode(404, "没有找到相应的资源！").Put("error", err.Error()))
		return
	}
	c.Header("Content-Type", service.ContentType(filename))
	display := filename
	if name != "" {
		display = url.QueryEscape(name)
	}
	c.Header("Content-Disposition", typ+"; filename="+display)
	c.File(absPath)
}
