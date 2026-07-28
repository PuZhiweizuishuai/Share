package cache

import (
	"sync"
	"time"

	"share-go/internal/model"
)

// LoginCountCache 对齐 Spring InMemoryLoginCountRepositoryImpl：登录失败计数内存缓存
type LoginCountCache struct {
	mu       sync.Mutex
	m        map[string]model.LoginCount
	maxCount int
}

func NewLoginCountCache(maxCount int) *LoginCountCache {
	return &LoginCountCache{m: make(map[string]model.LoginCount), maxCount: maxCount}
}

// Add 登录失败 +1
func (c *LoginCountCache) Add(ip string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	v, ok := c.m[ip]
	if !ok {
		c.m[ip] = model.LoginCount{Ip: ip, Count: 1, StartTime: nowMillis()}
		return
	}
	v.Count++
	v.StartTime = nowMillis()
	c.m[ip] = v
}

// Get 当前失败次数
func (c *LoginCountCache) Get(ip string) int {
	c.mu.Lock()
	defer c.mu.Unlock()
	if v, ok := c.m[ip]; ok {
		return v.Count
	}
	return 1
}

// Check 是否未超限，对齐 checkLoginCount
func (c *LoginCountCache) Check(ip string) bool {
	return c.Get(ip) < c.maxCount
}

// Delete 清零计数
func (c *LoginCountCache) Delete(ip string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.m, ip)
}

// Clean 清理超过一小时的记录，对齐 LoginCountRepository.clean
func (c *LoginCountCache) Clean() {
	c.mu.Lock()
	defer c.mu.Unlock()
	now := nowMillis()
	for ip, v := range c.m {
		if now-v.StartTime > model.OneHour {
			delete(c.m, ip)
		}
	}
}

func nowMillis() int64 {
	return time.Now().UnixMilli()
}

func intPtr(v int) *int {
	return &v
}
