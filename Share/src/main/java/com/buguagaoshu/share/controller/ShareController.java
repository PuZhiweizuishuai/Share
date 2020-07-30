package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.util.StringUtils;
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
        Page<Share> shareList = shareService.findShareList(page, size, key);
        if (StringUtils.isEmpty(key)) {
            return ResponseDetails.ok().put("page", shareList);
        }
        return ResponseDetails.ok().put("page", shareList.getContent());

    }


    @PostMapping("/api/share/save")
    public ResponseDetails save(@RequestBody Share share) {
        shareService.save(share);
        return ResponseDetails.ok();
    }

    @DeleteMapping("/api/share/delete")
    public ResponseDetails delete(@RequestBody Share share) {
        return ResponseDetails.ok(shareService.delete(share));
    }
}
