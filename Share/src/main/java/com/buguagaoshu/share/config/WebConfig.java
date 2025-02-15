package com.buguagaoshu.share.config;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.IpRepository;
import com.buguagaoshu.share.repository.TagCacheRepository;
import com.buguagaoshu.share.repository.impl.InMemoryIpCache;
import com.buguagaoshu.share.service.UserService;
import com.buguagaoshu.share.utils.IpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.io.File;
import java.net.*;
import java.util.Enumeration;
import java.util.Optional;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-03 18:49
 */
@Configuration
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class WebConfig implements WebMvcConfigurer {

    private final MultipartProperties multipartProperties;
    private final SecurityInterceptor securityInterceptor;
    public final InMemoryIpCache inMemoryIpCache;
    public final UserService userService;
    private final LoginInterceptor loginInterceptor;
    private final HttpHeaderInterceptor httpHeaderInterceptor;


    @Autowired
    public WebConfig(MultipartProperties multipartProperties, SecurityInterceptor securityInterceptor, InMemoryIpCache inMemoryIpCache, UserService userService, LoginInterceptor loginInterceptor, HttpHeaderInterceptor httpHeaderInterceptor) {
        this.multipartProperties = multipartProperties;
        this.securityInterceptor = securityInterceptor;
        this.inMemoryIpCache = inMemoryIpCache;
        this.userService = userService;
        this.loginInterceptor = loginInterceptor;
        this.httpHeaderInterceptor = httpHeaderInterceptor;
    }


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(securityInterceptor)
                .addPathPatterns("/api/**", "/api/file/list", "/api/upload/setting/filemax")
                .excludePathPatterns("/api/login"
                        , "/api/ip"
                        , "/api/upload/disk"
                        , "/api/upload/file/**"
                        , "/api/public/**"
                        , "/api/login/check",
                        "/api/ai/config",
                        "/api/ai/check");
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/api/admin/**", "/api/ai/invitation/**", "/api/ai/invitation", "/api/ai/save");
        registry.addInterceptor(httpHeaderInterceptor).addPathPatterns("/**");
    }

    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
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
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                // 初始化标签缓存
                tagCacheRepository.initTagMap();
                tagCacheRepository.initTagList();
                // 初始化ip白名单
                inMemoryIpCache.init();
                // 初始化管理员账号
                User admin = userService.findByUsername("admin");
                if (admin == null) {
                    User user = new User();
                    user.setUsername("admin");
                    user.setPassword("123456");
                    userService.save(user);
                }
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
                    diskMessage.setEditType(0);
                    diskMessage.setAvailableDisk(diskPartition.getFreeSpace());
                    diskMessage.setUploadFileMax(multipartProperties.getMaxFileSize().toMegabytes());
                    disk.save(diskMessage);
                }
            }
        };
    }
}
