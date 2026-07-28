package controller

import (
	"github.com/gin-gonic/gin"

	"share-go/internal/middleware"
	"share-go/internal/model"
	"share-go/internal/service"
	"share-go/internal/utils"
)

// PublicShareController 对齐 Spring PublicShareController
type PublicShareController struct {
	Service *service.PublicShareService
	IsProxy bool
}

// CreatePublicShare POST /api/public/share
func (p *PublicShareController) CreatePublicShare(c *gin.Context) {
	user := middleware.CurrentUser(c)
	if user == nil {
		c.JSON(200, model.OkWithCode(400, "no power"))
		return
	}
	var sh model.Share
	if err := c.ShouldBindJSON(&sh); err != nil {
		c.JSON(200, model.OkWithCode(400, err.Error()))
		return
	}
	res, err := p.Service.PublicShare(&sh, user)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", res))
}

// CreatePublicFile POST /api/public/file
func (p *PublicShareController) CreatePublicFile(c *gin.Context) {
	user := middleware.CurrentUser(c)
	if user == nil {
		c.JSON(200, model.OkWithCode(400, "no power"))
		return
	}
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		c.JSON(200, model.OkWithCode(400, err.Error()))
		return
	}
	res, err := p.Service.PublicFile(&fm, user)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", res))
}

// CancelPublicShare POST /api/public/share/cancel
func (p *PublicShareController) CancelPublicShare(c *gin.Context) {
	user := middleware.CurrentUser(c)
	if user == nil {
		c.JSON(200, model.OkWithCode(400, "no power"))
		return
	}
	var sh model.Share
	if err := c.ShouldBindJSON(&sh); err != nil {
		c.JSON(200, model.OkWithCode(400, err.Error()))
		return
	}
	ok, err := p.Service.CancelPublicShare(&sh, user)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", ok))
}

// CancelPublicFile POST /api/public/file/cancel
func (p *PublicShareController) CancelPublicFile(c *gin.Context) {
	user := middleware.CurrentUser(c)
	if user == nil {
		c.JSON(200, model.OkWithCode(400, "no power"))
		return
	}
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		c.JSON(200, model.OkWithCode(400, err.Error()))
		return
	}
	ok, err := p.Service.CancelPublicFile(&fm, user)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", ok))
}

// GetShare POST /api/public/share/get
func (p *PublicShareController) GetShare(c *gin.Context) {
	var sh model.Share
	if err := c.ShouldBindJSON(&sh); err != nil {
		c.JSON(200, model.OkWithCode(400, err.Error()))
		return
	}
	ip := utils.GetIpAddr(c.Request, p.IsProxy)
	ua := utils.GetUa(c.Request)
	res, err := p.Service.GetPublicShare(sh.Url, sh.UserSeeKey, ip, ua)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", res))
}

// GetFile POST /api/public/file/get
func (p *PublicShareController) GetFile(c *gin.Context) {
	var fm model.FileMessage
	if err := c.ShouldBindJSON(&fm); err != nil {
		c.JSON(200, model.OkWithCode(400, err.Error()))
		return
	}
	ip := utils.GetIpAddr(c.Request, p.IsProxy)
	ua := utils.GetUa(c.Request)
	res, err := p.Service.GetPublicFile(fm.Url, fm.UserSeeKey, ip, ua)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	c.JSON(200, model.Ok().Put("data", res))
}

// CheckShare GET /api/public/share/check?id=
func (p *PublicShareController) CheckShare(c *gin.Context) {
	id := c.Query("id")
	sh, err := p.Service.CheckShare(id)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if sh != nil {
		c.JSON(200, model.Ok().Put("data", sh.HaveUserSeeKey))
		return
	}
	c.JSON(200, model.OkWithCode(404, "not find!"))
}

// CheckFile GET /api/public/file/check?id=
func (p *PublicShareController) CheckFile(c *gin.Context) {
	id := c.Query("id")
	fm, err := p.Service.CheckFile(id)
	if err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	if fm != nil {
		c.JSON(200, model.Ok().Put("data", fm.HaveUserSeeKey))
		return
	}
	c.JSON(200, model.OkWithCode(404, "not find!"))
}
