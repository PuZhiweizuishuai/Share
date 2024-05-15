package com.buguagaoshu.share.config;

import com.buguagaoshu.share.domain.IpData;
import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.repository.IpRepository;
import com.buguagaoshu.share.repository.impl.InMemoryIpCache;
import com.buguagaoshu.share.utils.IpUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
@Service
@Slf4j
public class SecurityInterceptor implements HandlerInterceptor {
    private final InMemoryIpCache inMemoryIpCache;

    private final IpUtils ipUtils;

    public SecurityInterceptor(InMemoryIpCache inMemoryIpCache, IpUtils ipUtil) {
        this.inMemoryIpCache = inMemoryIpCache;
        this.ipUtils = ipUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 只允许白名单内的IP无账号密码访问

        String ip = ipUtils.getIpAddr(request);

        // log.info("ip:{}", ip);
        IpData ipData = inMemoryIpCache.getWhitelistIpMap().get(ip);

        // 对非白名单IP进行鉴权
        if (ipData == null) {
            User user = (User) request.getSession().getAttribute(WebConstant.LOGIN_USER);
            return user != null;
        }

        return true;
    }
}
