package com.buguagaoshu.share.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;


/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@ConfigurationProperties(
        prefix = "share"
)
@Data
public class MyConfigProperties {
    private Boolean isTheProxyConfigured;

    private Integer maxLoginCount;

    private Boolean openIpAddress;

    private String ipDbPath;

    public Boolean getOpenIpAddress() {
        if (this.openIpAddress == null) {
            return false;
        }
        return this.openIpAddress;
    }

    public String getIpDbPath() {
        if (this.ipDbPath == null) {
            return "";
        }
        return this.ipDbPath;
    }

    public Integer getMaxLoginCount() {
        if (this.maxLoginCount == null) {
            return 3;
        }
        return this.maxLoginCount;
    }

    public Boolean getIsTheProxyConfigured() {
        if (this.isTheProxyConfigured == null) {
            return false;
        }
        return this.isTheProxyConfigured;
    }
}
