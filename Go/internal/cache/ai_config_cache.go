package cache

import (
	"sync"

	"gorm.io/gorm"

	"share-go/internal/model"
)

// AiConfigCache 对齐 Spring AiController 内的 configDataMap：启动全量加载 ConfigData
type AiConfigCache struct {
	mu sync.RWMutex
	m  map[string]model.ConfigData
	db *gorm.DB
}

func NewAiConfigCache(db *gorm.DB) *AiConfigCache {
	return &AiConfigCache{m: make(map[string]model.ConfigData), db: db}
}

// Init 全量加载
func (c *AiConfigCache) Init() error {
	var all []model.ConfigData
	if err := c.db.Find(&all).Error; err != nil {
		return err
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, v := range all {
		c.m[v.Name] = v
	}
	return nil
}

// Get 取配置
func (c *AiConfigCache) Get(name string) (model.ConfigData, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	v, ok := c.m[name]
	return v, ok
}

// Set 写入并持久化
func (c *AiConfigCache) Set(cd model.ConfigData) error {
	if err := c.db.Save(&cd).Error; err != nil {
		return err
	}
	c.mu.Lock()
	c.m[cd.Name] = cd
	c.mu.Unlock()
	return nil
}

// Remove 删除
func (c *AiConfigCache) Remove(name string) error {
	if err := c.db.Where("name = ?", name).Delete(&model.ConfigData{}).Error; err != nil {
		return err
	}
	c.mu.Lock()
	delete(c.m, name)
	c.mu.Unlock()
	return nil
}

// Invitations 返回 configMessage == "邀请码" 的配置列表
func (c *AiConfigCache) Invitations() []model.ConfigData {
	c.mu.RLock()
	defer c.mu.RUnlock()
	out := make([]model.ConfigData, 0)
	for _, v := range c.m {
		if v.ConfigMessage == "邀请码" {
			out = append(out, v)
		}
	}
	return out
}
