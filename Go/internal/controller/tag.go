package controller

import (
	"github.com/gin-gonic/gin"

	"share-go/internal/cache"
	"share-go/internal/model"
)

// TagController 对齐 Spring TagController
type TagController struct {
	Cache *cache.TagCache
}

// GetTagList GET /api/tag/list
func (t *TagController) GetTagList(c *gin.Context) {
	c.JSON(200, model.Ok().Put("data", t.Cache.GetList()))
}

// Save POST /api/tag/save （空实现）
func (t *TagController) Save(c *gin.Context) {
	c.JSON(200, model.Ok())
}
