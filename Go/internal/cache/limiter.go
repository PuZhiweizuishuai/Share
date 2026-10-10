package cache

import (
	"sync"
	"time"
)

// Limiter 内存固定窗口限流器，按 key（通常为 客户端IP + 路由）统计每分钟请求数。
// 用于公开分享/文件接口，防止提取码暴力破解与匿名刷接口。
type Limiter struct {
	mu      sync.Mutex
	windows map[string]*rateWindow
	window  time.Duration
	limit   int
}

type rateWindow struct {
	count int
	start int64
}

func NewLimiter(limit int, window time.Duration) *Limiter {
	return &Limiter{
		windows: make(map[string]*rateWindow),
		window:  window,
		limit:   limit,
	}
}

// Allow 判断 key 在当前窗口内是否仍被允许。
func (l *Limiter) Allow(key string) bool {
	now := time.Now().UnixMilli()
	winMs := l.window.Milliseconds()

	l.mu.Lock()
	defer l.mu.Unlock()
	w, ok := l.windows[key]
	if !ok || now-w.start >= winMs {
		l.windows[key] = &rateWindow{count: 1, start: now}
		return true
	}
	if w.count >= l.limit {
		return false
	}
	w.count++
	return true
}

// Clean 清理已过期的窗口，避免内存随 key 数量无限增长。
func (l *Limiter) Clean() {
	now := time.Now().UnixMilli()
	winMs := l.window.Milliseconds()
	l.mu.Lock()
	defer l.mu.Unlock()
	for k, w := range l.windows {
		if now-w.start >= winMs {
			delete(l.windows, k)
		}
	}
}
