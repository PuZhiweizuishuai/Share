package middleware

import (
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
		if Trusted(c, ipCache, isProxy) {
			c.Next()
			return
		}
		c.AbortWithStatusJSON(401, model.OkWithCode(0, "no login!"))
	}
}

// Trusted 判断当前请求是否可信：客户端 IP 在白名单中，或 session 已登录。
// 供公开接口做隐私保护判断使用（如 /api/upload/disk 的磁盘空间信息）。
func Trusted(c *gin.Context, ipCache *cache.IpCache, isProxy bool) bool {
	ip := utils.GetIpAddr(c.Request, isProxy)
	if _, ok := ipCache.Get(ip); ok {
		return true
	}
	return CurrentUser(c) != nil
}
