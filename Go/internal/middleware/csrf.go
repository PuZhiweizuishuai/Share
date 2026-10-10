package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"share-go/internal/model"
	"share-go/internal/utils"
)

// CSRF double-submit cookie：
//   - 每个请求若缺少 XSRF-TOKEN cookie 则签发一个随机值（非 HttpOnly，供前端 JS 读取）
//   - 非安全方法（POST/PUT/PATCH/DELETE）要求请求头 X-XSRF-TOKEN 与 cookie 值一致且非空
//
// 攻击者无法跨站读取或伪造目标域下的 cookie 值，也就无法在请求头中带上匹配值，从而阻止 CSRF。
// 前端 src/utils/fetch.js 已按此约定发送 X-XSRF-TOKEN 头。
const (
	CsrfCookieName = "XSRF-TOKEN"
	CsrfHeaderName = "X-XSRF-TOKEN"
)

func safeMethod(method string) bool {
	switch strings.ToUpper(method) {
	case http.MethodGet, http.MethodHead, http.MethodOptions, http.MethodTrace:
		return true
	}
	return false
}

func Csrf() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie(CsrfCookieName)
		if err != nil || token == "" {
			token = utils.NewUUID()
			c.SetCookie(CsrfCookieName, token, 86400, "/", "", false, false)
		}

		if !safeMethod(c.Request.Method) {
			header := c.GetHeader(CsrfHeaderName)
			if header == "" || header != token {
				c.AbortWithStatusJSON(http.StatusForbidden,
					model.OkWithCode(403, "CSRF 校验失败，请刷新页面后重试"))
				return
			}
		}
		c.Next()
	}
}
