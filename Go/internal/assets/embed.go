package assets

import "embed"

// WebFS 内嵌前端编译产物（构建前由脚本将 web_v2/share_v3/dist 拷贝到 internal/assets/web）
//
//go:embed web
var WebFS embed.FS

// IpDbBytes 内嵌 ip2region.xdb 离线 IP 库（构建前由脚本拷贝到 internal/assets/ip2region.xdb）
//
//go:embed ip2region.xdb
var IpDbBytes []byte
