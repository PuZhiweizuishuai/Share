package com.buguagaoshu.share.utils;

import com.buguagaoshu.share.config.WebConfig;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.util.StringUtils;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
public class IpUtils {
    private Boolean isTheProxyConfigured = false;


    public IpUtils(boolean isTheProxyConfigured) {
        this.isTheProxyConfigured = isTheProxyConfigured;
    }

    public String getIpAddr(HttpServletRequest request) {
        if (isTheProxyConfigured) {
            return getProxyIpAddr(request);
        }
        return request.getRemoteAddr();
    }

    /**
     * 获取用户登陆IP
     * */
    public String getProxyIpAddr(HttpServletRequest request) {
        String ipAddress = null;
        try {
            ipAddress = request.getHeader("X-Real-IP");
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("x-forwarded-for");
            }
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("Proxy-Client-IP");
            }
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("WL-Proxy-Client-IP");
            }
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
                if (ipAddress.equals("127.0.0.1")) {
                    // 根据网卡取本机配置的IP
                    InetAddress inet = null;
                    try {
                        inet = InetAddress.getLocalHost();
                    } catch (UnknownHostException e) {
                        e.printStackTrace();
                    }
                    ipAddress = inet.getHostAddress();
                }
            }
            // 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
            if (ipAddress != null && ipAddress.length() > 15) {
                if (ipAddress.indexOf(",") > 0) {
                    ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
                }
            }
        } catch (Exception e) {
            ipAddress="";
        }
        // ipAddress = this.getRequest().getRemoteAddr();
        return ipAddress;
    }

    public String getUa(HttpServletRequest request) {
        String ua = request.getHeader("user-agent");
        if (StringUtils.isEmpty(ua)) {
            return "未知设备";
        }
        // 避免 UA 过长插入失败
        if(ua.length() > 500) {
            return ua.substring(0, 499);
        }
        return ua;
    }
}

