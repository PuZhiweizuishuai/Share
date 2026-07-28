package cache

import (
	"sync"

	"gorm.io/gorm"

	"share-go/internal/model"
)

// IpCache 对齐 Spring InMemoryIpCache：IP 白名单内存缓存，启动时全量加载
type IpCache struct {
	mu sync.RWMutex
	m  map[string]model.IpData
	db *gorm.DB
}

func NewIpCache(db *gorm.DB) *IpCache {
	return &IpCache{m: make(map[string]model.IpData), db: db}
}

// Init 全量加载 IP 白名单
func (c *IpCache) Init() error {
	var all []model.IpData
	if err := c.db.Find(&all).Error; err != nil {
		return err
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, ip := range all {
		c.m[ip.Ip] = ip
	}
	return nil
}

// SaveIp 新增白名单 IP，对齐 InMemoryIpCache.saveIp
func (c *IpCache) SaveIp(ip, user string) error {
	now := nowMillis()
	ipData := model.IpData{
		Ip:         ip,
		CreateUser: user,
		CreateTime: &now,
		ModifyTime: &now,
		HasEnable:  intPtr(1),
	}
	if err := c.db.Save(&ipData).Error; err != nil {
		return err
	}
	c.mu.Lock()
	c.m[ip] = ipData
	c.mu.Unlock()
	return nil
}

// DeleteIp 删除白名单 IP
func (c *IpCache) DeleteIp(ip model.IpData) error {
	if err := c.db.Where("ip = ?", ip.Ip).Delete(&model.IpData{}).Error; err != nil {
		return err
	}
	c.mu.Lock()
	delete(c.m, ip.Ip)
	c.mu.Unlock()
	return nil
}

// Get 是否在白名单
func (c *IpCache) Get(ip string) (model.IpData, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	v, ok := c.m[ip]
	return v, ok
}

// All 返回全部白名单
func (c *IpCache) All() []model.IpData {
	c.mu.RLock()
	defer c.mu.RUnlock()
	out := make([]model.IpData, 0, len(c.m))
	for _, v := range c.m {
		out = append(out, v)
	}
	return out
}
