package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.ViewCountLog;
import com.buguagaoshu.share.service.ViewCountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-24
 */
@RestController
public class ViewCountLogController {
    private final ViewCountService viewCountService;

    public ViewCountLogController(ViewCountService viewCountService) {
        this.viewCountService = viewCountService;
    }

    @GetMapping("/api/admin/viewlog/list")
    public ResponseDetails getViewCountLog(@RequestParam(value = "page", required = false) Integer page,
                                           @RequestParam(value = "size", required = false) Integer size,
                                           @RequestParam(value = "type") Integer type,
                                           @RequestParam(value = "targetId") Long targetId) {
        if (type != WebConstant.VIEW_LOG_TYPE_FILE && type != WebConstant.VIEW_LOG_TYPE_SHARE && type != WebConstant.VIEW_LOG_TYPE_AI) {
            return ResponseDetails.ok(404, "");
        }
        if (targetId == null) {
            return ResponseDetails.ok(404, "");
        }
        return ResponseDetails.ok().put("data", viewCountService.findByShareViewLog(targetId, type, page, size));
    }
}
