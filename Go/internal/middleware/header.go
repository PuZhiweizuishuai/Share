package middleware

import "github.com/gin-gonic/gin"

// Header 对齐 Spring HttpHeaderInterceptor：所有响应加 X-Frame-Options: SAMEORIGIN
func Header() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("X-Frame-Options", "SAMEORIGIN")
		c.Next()
	}
}
