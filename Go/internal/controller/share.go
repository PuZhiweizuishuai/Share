package controller

import (
	"github.com/gin-gonic/gin"

	"share-go/internal/model"
	"share-go/internal/service"
)

// ShareController 对齐 Spring ShareController
type ShareController struct {
	ShareService *service.ShareService
}

// List GET /api/share/list
func (s *ShareController) List(c *gin.Context) {
	page := atoiDefault(c.Query("page"), 1)
	size := atoiDefault(c.Query("size"), 20)
	key := c.Query("key")
	res, err := s.ShareService.FindShareList(page, size, key)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("page", res))
}

// Save POST /api/share/save
func (s *ShareController) Save(c *gin.Context) {
	var sh model.Share
	if err := c.ShouldBindJSON(&sh); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if err := s.ShareService.Save(&sh); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok())
}

// Delete POST /api/share/delete
func (s *ShareController) Delete(c *gin.Context) {
	var sh model.Share
	if err := c.ShouldBindJSON(&sh); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.OkStatus(s.ShareService.Delete(&sh)))
}

// Update POST /api/share/update （待完成，空实现）
func (s *ShareController) Update(c *gin.Context) {
	c.JSON(200, model.Ok())
}
