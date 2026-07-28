package controller

import (
	"github.com/gin-gonic/gin"

	"share-go/internal/cache"
	"share-go/internal/middleware"
	"share-go/internal/model"
	"share-go/internal/service"
	"share-go/internal/utils"
)

const (
	aiConfigName     = "AI_CONFIG"
	invitationCodeKey = "invitationCode"
)

// AiController 对齐 Spring AiController
type AiController struct {
	Cache      *cache.AiConfigCache
	ViewCount  *service.ViewCountService
	IsProxy    bool
}

// GetAiConfig POST /api/ai/config
func (a *AiController) GetAiConfig(c *gin.Context) {
	var m map[string]string
	_ = c.ShouldBindJSON(&m)
	user := middleware.CurrentUser(c)
	if user != nil {
		if cd, ok := a.Cache.Get(aiConfigName); ok {
			c.JSON(200, model.Ok().Put("data", cd))
		} else {
			c.JSON(200, model.Ok())
		}
		return
	}
	// 邀请码访问
	if m != nil {
		if code, ok := m[invitationCodeKey]; ok && code != "" {
			if data, ok2 := a.Cache.Get(code); ok2 {
				ip := utils.GetIpAddr(c.Request, a.IsProxy)
				ua := utils.GetUa(c.Request)
				targetId := int64(0)
				if data.ID != nil {
					targetId = *data.ID
				}
				a.ViewCount.AddViewCountLog(model.ViewLogTypeAi, targetId, ip, ua)
				if cd, ok3 := a.Cache.Get(aiConfigName); ok3 {
					c.JSON(200, model.Ok().Put("data", cd))
					return
				}
			}
		}
	}
	c.JSON(200, model.Ok())
}

// CheckAiPower GET /api/ai/check
func (a *AiController) CheckAiPower(c *gin.Context) {
	user := middleware.CurrentUser(c)
	c.JSON(200, model.Ok().Put("data", user != nil))
}

// SetAiConfig POST /api/ai/save
func (a *AiController) SetAiConfig(c *gin.Context) {
	var cd model.ConfigData
	if err := c.ShouldBindJSON(&cd); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	now := utils.NowMillis()
	if existing, ok := a.Cache.Get(aiConfigName); ok {
		existing.ConfigMessage = cd.ConfigMessage
		existing.UpdateTime = &now
		_ = a.Cache.Set(existing)
	} else {
		cd.Name = aiConfigName
		cd.CreateTime = &now
		cd.UpdateTime = &now
		_ = a.Cache.Set(cd)
	}
	c.JSON(200, model.Ok())
}

// CreateAiInvitationCode POST /api/ai/invitation
func (a *AiController) CreateAiInvitationCode(c *gin.Context) {
	now := utils.NowMillis()
	cd := model.ConfigData{
		Name:          utils.NewUUID(),
		CreateTime:    &now,
		UpdateTime:    &now,
		ConfigMessage: "邀请码",
	}
	_ = a.Cache.Set(cd)
	c.JSON(200, model.Ok().Put("data", cd))
}

// ListAiInvitationCode GET /api/ai/invitation/list
func (a *AiController) ListAiInvitationCode(c *gin.Context) {
	c.JSON(200, model.Ok().Put("data", a.Cache.Invitations()))
}

// DeleteAiInvitationCode POST /api/ai/invitation/delete
func (a *AiController) DeleteAiInvitationCode(c *gin.Context) {
	var cd model.ConfigData
	if err := c.ShouldBindJSON(&cd); err != nil {
		c.JSON(200, model.OkWithCode(500, err.Error()))
		return
	}
	_ = a.Cache.Remove(cd.Name)
	c.JSON(200, model.Ok())
}
