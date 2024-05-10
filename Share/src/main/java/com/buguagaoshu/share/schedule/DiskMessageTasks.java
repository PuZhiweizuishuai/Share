package com.buguagaoshu.share.schedule;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Optional;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-08 20:51
 */
@Component
@Slf4j
public class DiskMessageTasks {

    private final DiskMessageRepository diskMessageRepository;

    @Autowired
    public DiskMessageTasks(DiskMessageRepository diskMessageRepository) {
        this.diskMessageRepository = diskMessageRepository;
    }

    @Scheduled(fixedRate = 21600000)
    public void setAvailableDisk() {
        Optional<DiskMessage> byId = diskMessageRepository.findById(1);
        File diskPartition = new File("/");
        byId.get().setAvailableDisk(diskPartition.getFreeSpace());
        diskMessageRepository.save(byId.get());
        log.info("更新磁盘数据完成");
    }
}
