package com.buguagaoshu.share.config;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.util.unit.DataSize;


import java.io.File;
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

    @Bean
    public CommandLineRunner dataLoader(DiskMessageRepository disk) {
        System.out.println(multipartProperties.getMaxFileSize());

        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {

                File diskPartition = new File("/");
                Optional<DiskMessage> id = disk.findById(1);
                if (id.isPresent()) {
                    id.get().setAvailableDisk(diskPartition.getFreeSpace());
                    if (id.get().getUploadFileMax() == null) {
                        id.get().setUploadFileMax(multipartProperties.getMaxFileSize().toMegabytes());
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
