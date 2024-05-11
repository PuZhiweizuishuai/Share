package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.IpData;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.repository.LoginCountRepository;
import com.buguagaoshu.share.repository.impl.InMemoryIpCache;
import com.buguagaoshu.share.service.UserService;
import com.buguagaoshu.share.utils.IpUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
@RestController
public class LoginAndWhitelistController {
    private final InMemoryIpCache inMemoryIpCache;
    private final UserService userService;
    private final IpUtils ipUtils;
    private final LoginCountRepository loginCountRepository;

    public LoginAndWhitelistController(InMemoryIpCache inMemoryIpCache, UserService userService, IpUtils ipUtils, LoginCountRepository loginCountRepository) {
        this.inMemoryIpCache = inMemoryIpCache;
        this.userService = userService;
        this.ipUtils = ipUtils;
        this.loginCountRepository = loginCountRepository;
    }

    @GetMapping("/api/ip")
    public ResponseDetails getIp(HttpServletRequest request) {
        return ResponseDetails.ok().put("data", ipUtils.getIpAddr(request));
    }

    @GetMapping("/api/login/check")
    public ResponseDetails loginCheck(HttpServletRequest request) {
        User login = (User) request.getSession().getAttribute(WebConstant.LOGIN_USER);
        if (login != null) {
            return ResponseDetails.ok().put("data", login);
        } else {
            return ResponseDetails.ok(0, "no login!");
        }
    }

    @PostMapping("/api/login")
    public ResponseDetails login(@RequestBody User user, HttpServletRequest request, HttpSession session) {
        String ip = ipUtils.getIpAddr(request);
        if (!loginCountRepository.checkLoginCount(ip)) {
            return ResponseDetails.ok(400, "登录错误次数超限，请稍后再试");
        }

        User login = userService.login(user);
        if (login != null) {
            session.setAttribute(WebConstant.LOGIN_USER, login);
            // 登录次数归零
            loginCountRepository.deleteLoginCount(ip);
            return ResponseDetails.ok().put("data", login);
        } else {

            loginCountRepository.addLoginCount(ip);
            return ResponseDetails.ok(400, "账号或密码错误");
        }
    }


    @PostMapping("/api/admin/change/password")
    public ResponseDetails changePassword(@RequestBody User user, HttpSession session) {
        User login = userService.changePassword(user);
        if (login == null) {
            return ResponseDetails.ok().put("data", "");
        }
        session.setAttribute(WebConstant.LOGIN_USER, null);
        return ResponseDetails.ok().put("data", login);
    }

    @PostMapping("/api/admin/whitelist/add")
    public ResponseDetails addWhitelist(@RequestBody String ip, HttpSession session) {

        if (session.getAttribute(WebConstant.LOGIN_USER) == null) {
            return ResponseDetails.ok().put("data", "no power!");
        }
        User user = (User) session.getAttribute(WebConstant.LOGIN_USER);
        inMemoryIpCache.saveIp(ip.replaceAll("\"", ""), user.getUsername());
        return ResponseDetails.ok();
    }

    @PostMapping("/api/admin/whitelist/delete")
    public ResponseDetails deleteWhitelist(@RequestBody IpData ip, HttpSession session) {

        if (session.getAttribute(WebConstant.LOGIN_USER) == null) {
            return ResponseDetails.ok().put("data", "no power!");
        }
        inMemoryIpCache.deleteIp(ip);
        return ResponseDetails.ok();
    }

    @GetMapping("/api/admin/whitelist")
    public ResponseDetails getWhitelist() {
        return ResponseDetails.ok().put("data", inMemoryIpCache.getWhitelistIps());
    }
}
