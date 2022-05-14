package com.buguagaoshu.share.config;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.TagCacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;


import java.io.File;
import java.net.*;
import java.util.Enumeration;
import java.util.Optional;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-03 18:49
 */
@Configuration
public class WebConfig {

    private final MultipartProperties multipartProperties;

    @Autowired
    public WebConfig(MultipartProperties multipartProperties) {
        this.multipartProperties = multipartProperties;
    }

//    @Bean
//    public MultipartConfigElement multipartConfigFactory() {
//        MultipartConfigFactory multipartConfigFactory = new MultipartConfigFactory();
//        multipartConfigFactory.setMaxFileSize(multipartProperties.getMaxFileSize());
//        multipartConfigFactory.setMaxRequestSize(multipartProperties.getMaxRequestSize());
//        return multipartConfigFactory.createMultipartConfig();
//    }

    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer(){
        return factory -> {
            ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html");
            factory.addErrorPages(error404Page);
        };
    }

    public static String getIpAddress() {
        try {
            Enumeration<NetworkInterface> allNetInterfaces = NetworkInterface.getNetworkInterfaces();
            InetAddress ip;
            StringBuilder ipStr = new StringBuilder();
            while (allNetInterfaces.hasMoreElements()) {
                NetworkInterface netInterface = allNetInterfaces.nextElement();
                if (netInterface.isLoopback() || netInterface.isVirtual() || !netInterface.isUp()) {
                    continue;
                } else {
                    Enumeration<InetAddress> addresses = netInterface.getInetAddresses();
                    while (addresses.hasMoreElements()) {
                        ip = addresses.nextElement();
                        ipStr.append(ip.getHostAddress()).append("\n");
                    }
                }
            }
            return ipStr.toString();
        } catch (Exception e) {
            System.err.println("IP地址获取失败" + e.getMessage());
            return "";
        }
    }

    @Bean
    public CommandLineRunner dataLoader(DiskMessageRepository disk, TagCacheRepository tagCacheRepository) {
        System.out.println(multipartProperties.getMaxFileSize());

        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                // 初始化标签缓存
                tagCacheRepository.initTagMap();
                tagCacheRepository.initTagList();

                // 获取当前系统IP并显示
                System.out.println("当前系统IP为：" + getIpAddress());
                File diskPartition = new File("/");
                Optional<DiskMessage> id = disk.findById(1);
                if (id.isPresent()) {
                    id.get().setAvailableDisk(diskPartition.getFreeSpace());
                    if (id.get().getUploadFileMax() == null) {
                        id.get().setUploadFileMax(multipartProperties.getMaxFileSize().toMegabytes());
                    }
                    if (id.get().getEditType() == null) {
                        id.get().setEditType(0);
                    }
                    disk.save(id.get());
                } else {
                    DiskMessage diskMessage = new DiskMessage();
                    diskMessage.setUserDisk(0L);
                    diskMessage.setId(1);
                    diskMessage.setAvailableDisk(diskPartition.getFreeSpace());
                    diskMessage.setUploadFileMax(multipartProperties.getMaxFileSize().toMegabytes());
                    disk.save(diskMessage);
                }
            }
        };
    }
}
