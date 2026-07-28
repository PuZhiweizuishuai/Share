package controller

import (
	"github.com/gin-gonic/gin"

	"share-go/internal/model"
	"share-go/internal/service"
)

// ViewCountController 对齐 Spring ViewCountLogController
type ViewCountController struct {
	Service *service.ViewCountService
}

// GetViewCountLog GET /api/admin/viewlog/list?page&size&type&targetId
func (v *ViewCountController) GetViewCountLog(c *gin.Context) {
	tp := atoiDefault(c.Query("type"), -1)
	if tp != model.ViewLogTypeShare && tp != model.ViewLogTypeFile && tp != model.ViewLogTypeAi {
		c.JSON(200, model.OkWithCode(404, ""))
		return
	}
	targetIdStr := c.Query("targetId")
	if targetIdStr == "" {
		c.JSON(200, model.OkWithCode(404, ""))
		return
	}
	targetId := atoiDefault(targetIdStr, 0)
	page := atoiDefault(c.Query("page"), 1)
	size := atoiDefault(c.Query("size"), 20)
	res, err := v.Service.FindByShareViewLog(int64(targetId), tp, page, size)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", res))
}
