package com.buguagaoshu.share.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cache.annotation.CacheConfig;

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
