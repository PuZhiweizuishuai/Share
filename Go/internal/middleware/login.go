package middleware

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"share-go/internal/model"
)

// Login 对齐 Spring LoginInterceptor：仅检查 session 是否登录
func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		sess := sessions.Default(c)
		if u := sess.Get(SessionLoginUser); u != nil {
			c.Set(ContextLoginUser, u)
			c.Next()
			return
		}
		c.AbortWithStatusJSON(401, model.OkWithCode(0, "no login!"))
	}
}

// CurrentUser 从 session 取登录用户，未登录返回 nil
func CurrentUser(c *gin.Context) *model.User {
	if v, exists := c.Get(ContextLoginUser); exists {
		if u, ok := v.(*model.User); ok {
			return u
		}
	}
	sess := sessions.Default(c)
	if u := sess.Get(SessionLoginUser); u != nil {
		if user, ok := u.(*model.User); ok {
			return user
		}
	}
	return nil
}

// ClientIP 从上下文取客户端 IP
func ClientIP(c *gin.Context) string {
	if v, exists := c.Get(ContextClientIP); exists {
		if ip, ok := v.(string); ok {
			return ip
		}
	}
	return ""
}
