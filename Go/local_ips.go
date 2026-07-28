package main

import (
	"net"
	"strings"
)

// getLocalIPs 返回本机所有非回环、非虚拟的 IPv4 地址，对齐 Spring WebConfig.getIpAddress()
func getLocalIPs() string {
	var sb strings.Builder
	ifaces, err := net.Interfaces()
	if err != nil {
		return ""
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagLoopback != 0 || iface.Flags&net.FlagUp == 0 {
			continue
		}
		addrs, err := iface.Addrs()
		if err != nil {
			continue
		}
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			if ip == nil || ip.IsLoopback() {
				continue
			}
			if v4 := ip.To4(); v4 != nil {
				sb.WriteString(v4.String())
				sb.WriteString("\n")
			}
		}
	}
	return sb.String()
}
