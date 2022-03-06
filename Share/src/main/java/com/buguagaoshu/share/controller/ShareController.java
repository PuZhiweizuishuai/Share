package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-01 20:44
 */
@RestController
public class ShareController {

    private final ShareService shareService;

    @Autowired
    public ShareController(ShareService shareService) {
        this.shareService = shareService;
    }

    @GetMapping("/api/share/list")
    public ResponseDetails list(@RequestParam(value = "page", required = false) Integer page,
                                @RequestParam(value = "size", required = false) Integer size,
                                @RequestParam(value = "key", required = false) String key) {
        return ResponseDetails.ok().put("page", shareService.findShareList(page, size, key));
    }


    @PostMapping("/api/share/save")
    public ResponseDetails save(@RequestBody Share share) {
        shareService.save(share);
        return ResponseDetails.ok();
    }

    @PostMapping("/api/share/delete")
    public ResponseDetails delete(@RequestBody Share share) {
        return ResponseDetails.ok(shareService.delete(share));
    }

    /**
     * TODO 待完成
     * */
    @PostMapping("/api/share/update")
    public ResponseDetails update(@RequestBody Share share) {
        return ResponseDetails.ok();
    }
}
