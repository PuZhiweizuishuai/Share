package com.buguagaoshu.share.repository.impl;

import com.buguagaoshu.share.config.MyConfigProperties;
import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.LoginCount;
import com.buguagaoshu.share.repository.LoginCountRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@Repository
public class InMemoryLoginCountRepositoryImpl implements LoginCountRepository {
    private final ConcurrentHashMap<String, LoginCount> loginCountMap = new ConcurrentHashMap<>(10);

    private final MyConfigProperties myConfigProperties;

    public InMemoryLoginCountRepositoryImpl(MyConfigProperties myConfigProperties) {
        this.myConfigProperties = myConfigProperties;
    }

    @Override
    public void addLoginCount(String loginIp) {
        LoginCount count = loginCountMap.get(loginIp);
        if (count == null) {
            LoginCount newCount = new LoginCount();
            newCount.setCount(1);
            newCount.setIp(loginIp);
            newCount.setStartTime(System.currentTimeMillis());
            loginCountMap.put(loginIp, newCount);
        } else {
            int n = count.getCount() + 1;
            count.setCount(n);
            count.setStartTime(System.currentTimeMillis());
            loginCountMap.put(loginIp, count);
        }
    }

    @Override
    public int getLoginCount(String loginIp) {
        LoginCount count = loginCountMap.get(loginIp);
        if (count != null) {
            return count.getCount();
        }
        return 1;
    }

    @Override
    public Boolean checkLoginCount(String loginIp) {
        if (getLoginCount(loginIp) >= myConfigProperties.getMaxLoginCount()) {
            return false;
        }
        return true;
    }

    @Override
    public Boolean deleteLoginCount(String loginIp) {
        loginCountMap.remove(loginIp);
        return true;
    }

    @Override
    public void clean() {
        // 定时任务，一小时清理一次
        long nowTime = System.currentTimeMillis();
        Collection<LoginCount> values = loginCountMap.values();
        for (LoginCount count : values) {
            if (nowTime - count.getStartTime() > WebConstant.ONE_HOUR) {
                loginCountMap.remove(count.getIp());
            }
        }
    }
}
