package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.repository.FileMessageRepository;
import com.buguagaoshu.share.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2021-05-22 18:15
 * 数据迁移接口
 */
@RestController
public class MoveController {
    @Autowired
    ShareRepository shareRepository;

    @Autowired
    FileMessageRepository fileMessageRepository;

    @GetMapping("/move/share")
    public ResponseDetails moveShare() {
        return ResponseDetails.ok().put("share", shareRepository.findAll());
    }

    @GetMapping("/move/file")
    public ResponseDetails moveFile() {
        return ResponseDetails.ok().put("file", fileMessageRepository.findAll());
    }


    @PostMapping("/move/share")
    public ResponseDetails saveShare(@RequestBody List<Share> shares) {
        shareRepository.saveAll(shares);
        return ResponseDetails.ok();
    }

    @PostMapping("/move/file")
    public ResponseDetails saveFile(@RequestBody List<FileMessage> messages) {
        fileMessageRepository.saveAll(messages);
        return ResponseDetails.ok();
    }

}
