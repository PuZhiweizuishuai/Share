package com.buguagaoshu.share.schedule;


import com.buguagaoshu.share.repository.LoginCountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@Component
@Slf4j
public class LoginCountTasks {
    private final LoginCountRepository loginCountRepository;

    public LoginCountTasks(LoginCountRepository loginCountRepository) {
        this.loginCountRepository = loginCountRepository;
    }

    @Scheduled(fixedRate = 3600000)
    public void cleanLoginCount() {
        loginCountRepository.clean();
        log.info("完成登录失败用户登录次数重置！");
    }
}
