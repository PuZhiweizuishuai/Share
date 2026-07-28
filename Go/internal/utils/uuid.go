package utils

import (
	"strings"

	"github.com/google/uuid"
)

// NewUUID 生成去掉横线的 UUID 字符串，对齐 Java UUID.randomUUID().toString().replaceAll("-","")
// 供 service 与 controller 共用，避免在 service 包定义后 controller 无法引用。
func NewUUID() string {
	return strings.ReplaceAll(uuid.New().String(), "-", "")
}
