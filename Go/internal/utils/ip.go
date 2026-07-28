package utils

import (
	"net"
	"net/http"
	"strings"
)

// 对齐 Spring com.buguagaoshu.share.utils.IpUtils

// GetIpAddr 获取客户端 IP。isProxy=false 时用 RemoteAddr，true 时按代理头解析。
func GetIpAddr(r *http.Request, isProxy bool) string {
	if !isProxy {
		host, _, err := net.SplitHostPort(r.RemoteAddr)
		if err != nil {
			return r.RemoteAddr
		}
		return host
	}
	return getProxyIpAddr(r)
}

// getProxyIpAddr 对齐 IpUtils.getProxyIpAddr：依次取 X-Real-IP / x-forwarded-for /
// Proxy-Client-IP / WL-Proxy-Client-IP / RemoteAddr，127.0.0.1 时取本机网卡 IP
func getProxyIpAddr(r *http.Request) string {
	ip := ""
	headers := []string{"X-Real-IP", "x-forwarded-for", "Proxy-Client-IP", "WL-Proxy-Client-IP"}
	for _, h := range headers {
		ip = r.Header.Get(h)
		if ip == "" || strings.EqualFold(ip, "unknown") {
			continue
		}
		break
	}
	if ip == "" {
		host, _, err := net.SplitHostPort(r.RemoteAddr)
		if err != nil {
			ip = r.RemoteAddr
		} else {
			ip = host
		}
		if ip == "127.0.0.1" {
			if local, err := net.InterfaceAddrs(); err == nil {
				for _, addr := range local {
					if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
						if v4 := ipnet.IP.To4(); v4 != nil {
							ip = v4.String()
							break
						}
					}
				}
			}
		}
	}
	// 多个代理时取第一个
	if i := strings.Index(ip, ","); i > 0 {
		ip = strings.TrimSpace(ip[:i])
	}
	return ip
}

// GetUa 获取 User-Agent，空返回"未知设备"，超 500 截断 499，对齐 IpUtils.getUa
func GetUa(r *http.Request) string {
	ua := r.Header.Get("User-Agent")
	if ua == "" {
		return "未知设备"
	}
	if len(ua) > 500 {
		return ua[:499]
	}
	return ua
}
