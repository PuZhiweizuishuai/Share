package com.buguagaoshu.share.config;

import com.buguagaoshu.share.utils.IpUtils;
import lombok.extern.slf4j.Slf4j;
import org.lionsoul.ip2region.xdb.Searcher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@Configuration
@Slf4j
public class BeenConfig {
    private final MyConfigProperties myConfigProperties;

    public BeenConfig(MyConfigProperties myConfigProperties) {
        this.myConfigProperties = myConfigProperties;
    }

    @Bean
    public IpUtils ipUtils() {
        return new IpUtils(myConfigProperties.getIsTheProxyConfigured());
    }

    @Bean
    public Searcher searcher() {
        // 1、从 dbPath 加载整个 xdb 到内存。
        byte[] cBuff;
        try {
            cBuff = Searcher.loadContentFromFile(myConfigProperties.getIpDbPath());
        } catch (Exception e) {
            log.error("failed to load content from {}: {}\n", myConfigProperties.getIpDbPath(), e);
            return null;
        }
        Searcher searcher;
        try {
            searcher = Searcher.newWithBuffer(cBuff);
            return searcher;
        } catch (Exception e) {
            log.error("failed to create content cached searcher: {}\n", e);
            return null;
        }
    }
}
