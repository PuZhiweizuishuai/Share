package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.FileMessageRepository;
import com.buguagaoshu.share.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2021-05-22 18:15
 * 数据迁移接口
 */
@RestController()
public class MoveController {
    @Autowired
    ShareRepository shareRepository;

    @Autowired
    FileMessageRepository fileMessageRepository;
    @Autowired
    private DiskMessageRepository diskMessageRepository;

    @GetMapping("/api/admin/move/share")
    public ResponseDetails moveShare() {
        return ResponseDetails.ok().put("share", shareRepository.findAll());
    }

    @GetMapping("/api/admin/move/file")
    public ResponseDetails moveFile() {
        return ResponseDetails.ok().put("file", fileMessageRepository.findAll());
    }


    @PostMapping("/api/admin/move/share/save")
    public ResponseDetails saveShare(@RequestBody List<Share> shares) {
        shareRepository.saveAll(shares);
        return ResponseDetails.ok();
    }

    @PostMapping("/api/admin/move/file/save")
    public ResponseDetails saveFile(@RequestBody List<FileMessage> messages) {
        fileMessageRepository.saveAll(messages);
        Iterable<FileMessage> all = fileMessageRepository.findAll();
        // 更新存储空间
        long size = 0;
        for (FileMessage fileMessage : all) {
            size += fileMessage.getSize();
        }
        Optional<DiskMessage> byId = diskMessageRepository.findById(1);
        byId.get().setUserDisk(size);
        diskMessageRepository.save(byId.get());
        return ResponseDetails.ok();
    }

}
