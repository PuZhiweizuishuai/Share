package cache

import (
	"sync"

	"gorm.io/gorm"

	"share-go/internal/model"
)

// TagCache 对齐 Spring InMemoryTagCacheImpl：标签内存缓存
// map 保存带密码的原始标签；list 保存密码置空的副本（供 /api/tag/list 返回）
type TagCache struct {
	mu   sync.RWMutex
	m    map[int64]model.Tag
	list []model.Tag
	db   *gorm.DB
}

func NewTagCache(db *gorm.DB) *TagCache {
	return &TagCache{m: make(map[int64]model.Tag), db: db}
}

// Init 全量加载标签，构建 map 与 list
func (c *TagCache) Init() error {
	var all []model.Tag
	if err := c.db.Find(&all).Error; err != nil {
		return err
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	c.list = make([]model.Tag, 0, len(all))
	for _, t := range all {
		c.m[tagID(t)] = t
		// list 中存密码置空的副本，对齐 initTagList
		copyTag := t
		copyTag.Password = ""
		c.list = append(c.list, copyTag)
	}
	return nil
}

// GetList 返回密码置空的标签列表
func (c *TagCache) GetList() []model.Tag {
	c.mu.RLock()
	defer c.mu.RUnlock()
	out := make([]model.Tag, len(c.list))
	copy(out, c.list)
	return out
}

func tagID(t model.Tag) int64 {
	if t.ID == nil {
		return 0
	}
	return *t.ID
}
