package controller

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"share-go/internal/model"
	"share-go/internal/service"
)

// MoveController 对齐 Spring MoveController，并新增全表迁移端点
type MoveController struct {
	DB          *gorm.DB
	MoveService *service.MoveService
}

// MoveShare GET /api/admin/move/share
func (m *MoveController) MoveShare(c *gin.Context) {
	var shares []model.Share
	if err := m.DB.Find(&shares).Error; err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("share", shares))
}

// MoveFile GET /api/admin/move/file
func (m *MoveController) MoveFile(c *gin.Context) {
	var files []model.FileMessage
	if err := m.DB.Find(&files).Error; err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("file", files))
}

// SaveShare POST /api/admin/move/share/save
func (m *MoveController) SaveShare(c *gin.Context) {
	var shares []model.Share
	if err := c.ShouldBindJSON(&shares); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if len(shares) > 0 {
		if err := m.DB.Save(&shares).Error; err != nil {
			c.JSON(200, model.OkWithCode(500, err.Error()))
			return
		}
	}
	c.JSON(200, model.Ok())
}

// SaveFile POST /api/admin/move/file/save
func (m *MoveController) SaveFile(c *gin.Context) {
	var files []model.FileMessage
	if err := c.ShouldBindJSON(&files); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if len(files) > 0 {
		if err := m.DB.Save(&files).Error; err != nil {
			c.JSON(200, model.OkWithCode(500, err.Error()))
			return
		}
	}
	// 更新存储空间，对齐 Spring 逻辑：遍历全表求 size 之和
	if err := m.MoveService.RecomputeUserDisk(); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok())
}

// MoveAll GET /api/admin/move/all （新增：全表导出）
func (m *MoveController) MoveAll(c *gin.Context) {
	data, err := m.MoveService.ExportAll()
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", data))
}

// SaveAll POST /api/admin/move/all/save （新增：全表导入）
func (m *MoveController) SaveAll(c *gin.Context) {
	var data model.MoveAllData
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if err := m.MoveService.ImportAll(&data); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok())
}
