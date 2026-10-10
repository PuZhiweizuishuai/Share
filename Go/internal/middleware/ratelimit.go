package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"share-go/internal/cache"
	"share-go/internal/model"
	"share-go/internal/utils"
)

// RateLimit 按 客户端IP + 匹配路由 限流，超限返回 429。
// 仅用于公开的分享/文件接口，阻止提取码暴力破解与匿名刷接口。
func RateLimit(limiter *cache.Limiter, isProxy bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := utils.GetIpAddr(c.Request, isProxy)
		route := c.FullPath()
		if route == "" {
			route = c.Request.URL.Path
		}
		if !limiter.Allow(ip + "|" + route) {
			c.AbortWithStatusJSON(http.StatusTooManyRequests,
				model.OkWithCode(429, "请求过于频繁，请稍后再试"))
			return
		}
		c.Next()
	}
}
