package middleware

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"share-go/internal/cache"
	"share-go/internal/model"
	"share-go/internal/utils"
)

const (
	ContextClientIP = "clientIP"
	ContextLoginUser = "loginUser"
	SessionLoginUser = "login_user"
)

// Security 对齐 Spring SecurityInterceptor：IP 白名单放行，否则需 session 登录
func Security(ipCache *cache.IpCache, isProxy bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := utils.GetIpAddr(c.Request, isProxy)
		c.Set(ContextClientIP, ip)
		if _, ok := ipCache.Get(ip); ok {
			c.Next()
			return
		}
		sess := sessions.Default(c)
		if u := sess.Get(SessionLoginUser); u != nil {
			c.Set(ContextLoginUser, u)
			c.Next()
			return
		}
		c.AbortWithStatusJSON(401, model.OkWithCode(0, "no login!"))
	}
}
