package com.buguagaoshu.share.config;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.util.Optional;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-03 18:49
 */
@Configuration
public class WebConfig {
    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer(){
        return factory -> {
            ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html");
            factory.addErrorPages(error404Page);
        };
    }

    @Bean
    public CommandLineRunner dataLoader(DiskMessageRepository disk) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                File diskPartition = new File("/");
                Optional<DiskMessage> id = disk.findById(1);
                if (id.isPresent()) {
                    id.get().setAvailableDisk(diskPartition.getFreeSpace());
                    disk.save(id.get());
                } else {
                    DiskMessage diskMessage = new DiskMessage();
                    diskMessage.setUserDisk(0L);
                    diskMessage.setId(1);
                    diskMessage.setAvailableDisk(diskPartition.getFreeSpace());
                    disk.save(diskMessage);
                }
            }
        };
    }
}
