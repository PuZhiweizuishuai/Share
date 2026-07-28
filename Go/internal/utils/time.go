package utils

import (
	"strconv"
	"time"
)

// NowMillis 当前毫秒时间戳，对齐 Java System.currentTimeMillis()
func NowMillis() int64 {
	return time.Now().UnixMilli()
}

// NowMillisStr 当前毫秒时间戳的字符串形式
func NowMillisStr() string {
	return strconv.FormatInt(NowMillis(), 10)
}

// Int64Ptr 返回 int64 指针
func Int64Ptr(v int64) *int64 { return &v }

// IntPtr 返回 int 指针
func IntPtr(v int) *int { return &v }

// BoolPtr 返回 bool 指针
func BoolPtr(v bool) *bool { return &v }
