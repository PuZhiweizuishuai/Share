package utils

import (
	"fmt"
	"os"
	"sync"

	"github.com/lionsoul2014/ip2region/binding/golang/xdb"
)

// IpSearcher 对齐 Spring org.lionsoul.ip2region.xdb.Searcher
// xdb 原生 Searcher 非线程安全，这里加互斥锁包装为并发安全。
type IpSearcher struct {
	mu sync.Mutex
	s  *xdb.Searcher
}

// NewIpSearcherFromBytes 从 xdb 全量字节构建内存 Searcher，对齐 Spring 启动时全量加载 xdb
func NewIpSearcherFromBytes(buf []byte) (*IpSearcher, error) {
	if len(buf) == 0 {
		return nil, fmt.Errorf("ip2region.xdb 内容为空")
	}
	header, err := xdb.LoadHeaderFromBuff(buf)
	if err != nil {
		return nil, fmt.Errorf("读取 xdb header 失败: %w", err)
	}
	version, err := xdb.VersionFromHeader(header)
	if err != nil {
		// 旧版 v2 结构（仅 IPv4），回退到 IPv4
		version = xdb.IPv4
	}
	searcher, err := xdb.NewWithBuffer(version, buf)
	if err != nil {
		return nil, fmt.Errorf("创建 xdb searcher 失败: %w", err)
	}
	return &IpSearcher{s: searcher}, nil
}

// NewIpSearcherFromFile 从外部 xdb 文件构建内存 Searcher
func NewIpSearcherFromFile(path string) (*IpSearcher, error) {
	buf, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("读取 xdb 文件 %s 失败: %w", path, err)
	}
	return NewIpSearcherFromBytes(buf)
}

// Search 查询 IP 地理位置，对齐 Spring searcher.search(ip)
// 查询失败返回空字符串（调用方按"未查询到具体地理位置"处理）
func (is *IpSearcher) Search(ip string) string {
	if is == nil {
		return ""
	}
	is.mu.Lock()
	defer is.mu.Unlock()
	region, err := is.s.Search(ip)
	if err != nil {
		return ""
	}
	return region
}
