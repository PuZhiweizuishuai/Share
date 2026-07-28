package controller

import (
	"io"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"share-go/internal/cache"
	"share-go/internal/middleware"
	"share-go/internal/model"
	"share-go/internal/service"
	"share-go/internal/utils"
)

// LoginController 对齐 Spring LoginAndWhitelistController
type LoginController struct {
	IpCache       *cache.IpCache
	UserService   *service.UserService
	LoginCount    *cache.LoginCountCache
	SearchIp      func(string) string
	OpenIpAddress bool
	IsProxy       bool
}

// GetIp GET /api/ip
func (l *LoginController) GetIp(c *gin.Context) {
	ip := utils.GetIpAddr(c.Request, l.IsProxy)
	m := map[string]string{"ip": ip}
	if l.OpenIpAddress {
		if l.SearchIp != nil {
			if addr := l.SearchIp(ip); addr != "" {
				m["address"] = addr
			} else {
				m["address"] = "未查询到具体地理位置！"
			}
		}
	}
	c.JSON(200, model.Ok().Put("data", m))
}

// LoginCheck GET /api/login/check
func (l *LoginController) LoginCheck(c *gin.Context) {
	sess := sessions.Default(c)
	if u := sess.Get(middleware.SessionLoginUser); u != nil {
		c.JSON(200, model.Ok().Put("data", u))
		return
	}
	c.JSON(200, model.OkWithCode(0, "no login!"))
}

// Login POST /api/login
func (l *LoginController) Login(c *gin.Context) {
	var u model.User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(200, model.OkWithCode(400, "请求格式错误"))
		return
	}
	ip := utils.GetIpAddr(c.Request, l.IsProxy)
	if !l.LoginCount.Check(ip) {
		c.JSON(200, model.OkWithCode(400, "登录错误次数超限，请稍后再试"))
		return
	}
	login, err := l.UserService.Login(&u)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if login != nil {
		sess := sessions.Default(c)
		sess.Set(middleware.SessionLoginUser, login)
		sess.Options(sessions.Options{Path: "/", MaxAge: 0})
		_ = sess.Save()
		l.LoginCount.Delete(ip)
		c.JSON(200, model.Ok().Put("data", login))
		return
	}
	l.LoginCount.Add(ip)
	c.JSON(200, model.OkWithCode(400, "账号或密码错误"))
}

// ChangePassword POST /api/admin/change/password
func (l *LoginController) ChangePassword(c *gin.Context) {
	var u model.User
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(200, model.OkWithCode(400, "请求格式错误"))
		return
	}
	login, err := l.UserService.ChangePassword(&u)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if login == nil {
		c.JSON(200, model.Ok().Put("data", ""))
		return
	}
	sess := sessions.Default(c)
	sess.Delete(middleware.SessionLoginUser)
	_ = sess.Save()
	c.JSON(200, model.Ok().Put("data", login))
}

// AddWhitelist POST /api/admin/whitelist/add （body 为 JSON 字符串 IP）
func (l *LoginController) AddWhitelist(c *gin.Context) {
	user := middleware.CurrentUser(c)
	if user == nil {
		c.JSON(200, model.Ok().Put("data", "no power!"))
		return
	}
	body, _ := io.ReadAll(c.Request.Body)
	ip := strings.TrimSpace(strings.ReplaceAll(string(body), "\"", ""))
	_ = l.IpCache.SaveIp(ip, user.Username)
	c.JSON(200, model.Ok())
}

// DeleteWhitelist POST /api/admin/whitelist/delete
func (l *LoginController) DeleteWhitelist(c *gin.Context) {
	var ip model.IpData
	if err := c.ShouldBindJSON(&ip); err != nil {
		c.JSON(200, model.OkWithCode(400, "请求格式错误"))
		return
	}
	_ = l.IpCache.DeleteIp(ip)
	c.JSON(200, model.Ok())
}

// GetWhitelist GET /api/admin/whitelist
func (l *LoginController) GetWhitelist(c *gin.Context) {
	c.JSON(200, model.Ok().Put("data", l.IpCache.All()))
}
