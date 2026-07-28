package model

import "time"

// 返回码，对齐 Spring enums.ReturnCodeEnum
const (
	StatusSuccess      = 200
	StatusErrorShareId = 1001
	StatusErrorFileId  = 2001
)

// ResponseDetails 对齐 Spring domain.ResponseDetails（继承 HashMap）。
// 本质是一个可任意 put 键值对的 JSON 对象，默认含 status/message/timestamp。
type ResponseDetails map[string]interface{}

// Ok 创建一个成功响应
func Ok() ResponseDetails {
	return ResponseDetails{
		"status":    StatusSuccess,
		"message":   "Success!",
		"timestamp": time.Now(),
	}
}

// OkWithCode 创建带自定义状态码与消息的响应
func OkWithCode(code int, msg string) ResponseDetails {
	return Ok().Put("status", code).Put("message", msg)
}

// OkWithMessage 仅替换消息
func OkWithMessage(msg string) ResponseDetails {
	return Ok().Put("message", msg)
}

// OkStatus 对齐 Spring ResponseDetails.ok(ReturnCodeEnum)：用状态码映射消息
func OkStatus(code int) ResponseDetails {
	return Ok().Put("status", code).Put("message", CodeMessage(code))
}

// CodeMessage 返回码对应消息，对齐 ReturnCodeEnum
func CodeMessage(code int) string {
	switch code {
	case StatusSuccess:
		return "Success!"
	case StatusErrorShareId:
		return "错误的分享ID！"
	case StatusErrorFileId:
		return "文件不存在，或者文件ID错误！"
	default:
		return ""
	}
}

// Put 链式写入键值，对齐 Spring ResponseDetails.put（返回自身）
func (r ResponseDetails) Put(key string, value interface{}) ResponseDetails {
	r[key] = value
	return r
}

// PageMeta 对齐 Spring Data Page(VIA_DTO 模式) 的 page 子对象
type PageMeta struct {
	Size          int   `json:"size"`
	Number        int   `json:"number"`
	TotalElements int64 `json:"totalElements"`
	TotalPages    int   `json:"totalPages"`
}

// PageResult 对齐 Spring Data Page(VIA_DTO 模式) 序列化结构 {content, page}
type PageResult struct {
	Content interface{} `json:"content"`
	Page    PageMeta    `json:"page"`
}

// VditorFiles 对齐 Spring domain.VditorFiles（vditor 编辑器上传返回格式）
type VditorFiles struct {
	Msg  string                 `json:"msg"`
	Code int                    `json:"code"`
	Data map[string]interface{} `json:"data"`
}

// MoveAllData 统一全表迁移数据结构（导出/导入），Spring 与 Go 两端对等
type MoveAllData struct {
	Users     []User         `json:"users"`
	Tags      []Tag          `json:"tags"`
	Configs   []ConfigData   `json:"configs"`
	Whitelist []IpData       `json:"whitelist"`
	ViewLogs  []ViewCountLog `json:"viewlogs"`
	Disk      *DiskMessage   `json:"disk"`
	Share     []Share        `json:"share"`
	File      []FileMessage  `json:"file"`
}

// 视图日志类型常量，对齐 Spring WebConstant
const (
	ViewLogTypeShare = 0
	ViewLogTypeFile  = 1
	ViewLogTypeAi    = 2
)

// 一小时毫秒数，对齐 Spring WebConstant.ONE_HOUR
const OneHour = 3600000
