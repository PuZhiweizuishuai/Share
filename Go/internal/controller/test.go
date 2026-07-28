package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// TestController 对齐 Spring TestController
type TestController struct{}

// Name GET /api/test
func (t *TestController) Name(c *gin.Context) {
	page := c.Query("page")
	key := c.Query("key")
	c.String(200, "页码："+page+"  查询字符："+key)
}

// atoiDefault 解析查询参数，失败返回默认值（注意：与 strconv 无关的简单封装）
func atoiDefault(s string, def int) int {
	if s == "" {
		return def
	}
	// Go 的 strconv.Atoi 对非数字返回错误，这里返回默认值以对齐 Spring 行为（空→默认）
	n, err := strconv.Atoi(s)
	if err != nil {
		return def
	}
	return n
}
