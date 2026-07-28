package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.domain.MoveAllData;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
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
 * <p>
 * 既有 share/file 单表迁移，也提供全表迁移（/api/admin/move/all），
 * 全表结构与 Go 后端 model.MoveAllData 对齐，两端可相互迁移。
 */
@RestController()
public class MoveController {
    @Autowired
    ShareRepository shareRepository;

    @Autowired
    FileMessageRepository fileMessageRepository;

    @Autowired
    private DiskMessageRepository diskMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ConfigRepository configRepository;

    @Autowired
    private IpRepository ipRepository;

    @Autowired
    private ViewCountRepository viewCountRepository;

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

    /**
     * 全表导出，对齐 Go 后端 GET /api/admin/move/all。
     * 导出 users/tags/configs/whitelist/viewlogs/disk/share/file 全部表数据。
     */
    @GetMapping("/api/admin/move/all")
    public ResponseDetails moveAll() {
        MoveAllData data = new MoveAllData();
        data.setUsers((List<com.buguagaoshu.share.domain.User>) userRepository.findAll());
        data.setTags((List<com.buguagaoshu.share.domain.Tag>) tagRepository.findAll());
        data.setConfigs((List<com.buguagaoshu.share.domain.ConfigData>) configRepository.findAll());
        data.setWhitelist((List<com.buguagaoshu.share.domain.IpData>) ipRepository.findAll());
        data.setViewlogs((List<com.buguagaoshu.share.domain.ViewCountLog>) viewCountRepository.findAll());
        Optional<DiskMessage> disk = diskMessageRepository.findById(1);
        disk.ifPresent(data::setDisk);
        data.setShare((List<Share>) shareRepository.findAll());
        data.setFile((List<FileMessage>) fileMessageRepository.findAll());
        return ResponseDetails.ok().put("data", data);
    }

    /**
     * 全表导入，对齐 Go 后端 POST /api/admin/move/all/save。
     * 使用 saveAll upsert 全部表，并在导入完成后重算 disk.userDisk = 全部文件 size 之和。
     */
    @PostMapping("/api/admin/move/all/save")
    public ResponseDetails saveAll(@RequestBody MoveAllData data) {
        if (data.getUsers() != null && !data.getUsers().isEmpty()) {
            userRepository.saveAll(data.getUsers());
        }
        if (data.getTags() != null && !data.getTags().isEmpty()) {
            tagRepository.saveAll(data.getTags());
        }
        if (data.getConfigs() != null && !data.getConfigs().isEmpty()) {
            configRepository.saveAll(data.getConfigs());
        }
        if (data.getWhitelist() != null && !data.getWhitelist().isEmpty()) {
            ipRepository.saveAll(data.getWhitelist());
        }
        if (data.getViewlogs() != null && !data.getViewlogs().isEmpty()) {
            viewCountRepository.saveAll(data.getViewlogs());
        }
        if (data.getDisk() != null) {
            diskMessageRepository.save(data.getDisk());
        }
        if (data.getShare() != null && !data.getShare().isEmpty()) {
            shareRepository.saveAll(data.getShare());
        }
        if (data.getFile() != null && !data.getFile().isEmpty()) {
            fileMessageRepository.saveAll(data.getFile());
        }
        // 重算 userDisk = 全部文件 size 之和，对齐 /api/admin/move/file/save 逻辑
        long size = 0;
        for (FileMessage fileMessage : fileMessageRepository.findAll()) {
            size += fileMessage.getSize();
        }
        Optional<DiskMessage> byId = diskMessageRepository.findById(1);
        if (byId.isPresent()) {
            byId.get().setUserDisk(size);
            diskMessageRepository.save(byId.get());
        }
        return ResponseDetails.ok();
    }

}
