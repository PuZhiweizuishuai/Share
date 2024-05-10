package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.service.PublicShareService;
import com.buguagaoshu.share.utils.IpUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@RestController
public class PublicShareController {

    private final PublicShareService publicShareService;

    private final IpUtils ipUtils;

    public PublicShareController(PublicShareService publicShareService, IpUtils ipUtils) {
        this.publicShareService = publicShareService;
        this.ipUtils = ipUtils;
    }

    @PostMapping("/api/public/share")
    public ResponseDetails createPublicShare(@RequestBody Share share, HttpSession session) {
        User user = (User) session.getAttribute(WebConstant.LOGIN_USER);
        if (user == null) {
            return ResponseDetails.ok(400, "no power");
        }

        return ResponseDetails.ok().put("data", publicShareService.publicShare(share, user));
    }

    @PostMapping("/api/public/file")
    public ResponseDetails createPublicFile(@RequestBody FileMessage fileMessage, HttpSession session) {
        User user = (User) session.getAttribute(WebConstant.LOGIN_USER);
        if (user == null) {
            return ResponseDetails.ok(400, "no power");
        }

        return ResponseDetails.ok().put("data", publicShareService.publicFile(fileMessage, user));
    }

    @PostMapping("/api/public/share/get")
    public ResponseDetails getShare(@RequestBody Share share, HttpServletRequest request) {
        return ResponseDetails.ok().put("data", publicShareService.getPublicShare(share.getUrl(), share.getUserSeeKey(), ipUtils.getIpAddr(request)));
    }

    @PostMapping("/api/public/file/get")
    public ResponseDetails getShare(@RequestBody FileMessage fileMessage, HttpServletRequest request) {
        return ResponseDetails.ok().put("data", publicShareService.getPublicFile(fileMessage.getUrl(), fileMessage.getUserSeeKey(), ipUtils.getIpAddr(request)));
    }

    @GetMapping("/api/public/share/check")
    public ResponseDetails checkShare(@Param("id") String id) {
        Share share = publicShareService.checkShare(id);
        if (share != null) {
            return ResponseDetails.ok().put("data", share.isHaveUserSeeKey());
        }
        return ResponseDetails.ok(404, "not find!");
    }

    @GetMapping("/api/public/file/check")
    public ResponseDetails checkFile(@Param("id") String id) {
        FileMessage fileMessage = publicShareService.checkFile(id);
        if (fileMessage != null) {
            return ResponseDetails.ok().put("data", fileMessage.isHaveUserSeeKey());
        }
        return ResponseDetails.ok(404, "not find!");
    }
}
