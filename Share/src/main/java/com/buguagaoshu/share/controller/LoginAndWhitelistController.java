package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.IpData;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.User;
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

    public LoginAndWhitelistController(InMemoryIpCache inMemoryIpCache, UserService userService) {
        this.inMemoryIpCache = inMemoryIpCache;
        this.userService = userService;
    }

    @GetMapping("/api/ip")
    public ResponseDetails getIp(HttpServletRequest request) {
        return ResponseDetails.ok().put("data", IpUtils.getIpAddr(request));
    }

    @PostMapping("/api/login")
    public ResponseDetails login(@RequestBody User user, HttpSession session) {
        User login = userService.login(user);
        if (login == null) {
            return ResponseDetails.ok().put("data", "");
        }
        session.setAttribute("user", login);
        return ResponseDetails.ok().put("data", login);
    }


    @PostMapping("/api/admin/change/password")
    public ResponseDetails changePassword(@RequestBody User user, HttpSession session) {
        User login = userService.changePassword(user);
        if (login == null) {
            return ResponseDetails.ok().put("data", "");
        }
        session.setAttribute("user", null);
        return ResponseDetails.ok().put("data", login);
    }

    @PostMapping("/api/admin/whitelist/add")
    public ResponseDetails addWhitelist(@RequestBody String ip, HttpSession session) {

        if (session.getAttribute("user") == null) {
            return ResponseDetails.ok().put("data", "no power!");
        }
        User user = (User) session.getAttribute("user");
        inMemoryIpCache.saveIp(ip.replaceAll("\"", ""), user.getUsername());
        return ResponseDetails.ok();
    }

    @PostMapping("/api/admin/whitelist/delete")
    public ResponseDetails deleteWhitelist(@RequestBody IpData ip, HttpSession session) {

        if (session.getAttribute("user") == null) {
            return ResponseDetails.ok().put("data", "no power!");
        }
        User user = (User) session.getAttribute("user");
        inMemoryIpCache.deleteIp(ip);
        return ResponseDetails.ok();
    }

    @GetMapping("/api/admin/whitelist")
    public ResponseDetails getWhitelist() {
        return ResponseDetails.ok().put("data", inMemoryIpCache.getWhitelistIps());
    }
}
