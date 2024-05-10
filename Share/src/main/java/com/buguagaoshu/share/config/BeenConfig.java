package com.buguagaoshu.share.config;

import com.buguagaoshu.share.utils.IpUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@Configuration
public class BeenConfig {
    private final MyConfigProperties myConfigProperties;

    public BeenConfig(MyConfigProperties myConfigProperties) {
        this.myConfigProperties = myConfigProperties;
    }

    @Bean
    public IpUtils ipUtils() {
        return new IpUtils(myConfigProperties.getIsTheProxyConfigured());
    }
}
