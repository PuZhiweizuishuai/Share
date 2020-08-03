package com.buguagaoshu.share;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.FileMessageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.util.List;

@SpringBootTest
class ShareApplicationTests {

    @Autowired
    FileMessageRepository fileMessageRepository;

    @Autowired
    DiskMessageRepository diskMessageRepository;

    @Test
    void contextLoads() {
//        Iterable<FileMessage> all = fileMessageRepository.findAll();
//        long size = 0;
//        for (FileMessage f : all) {
//            size += f.getSize();
//        }
//        System.out.println(size);
        // 25071616
//        DiskMessage diskMessage = new DiskMessage();
//        diskMessage.setUserDisk(25071616L);
//        diskMessage.setId(1);
//        diskMessage.setAvailableDisk(0L);
//        diskMessageRepository.save(diskMessage);

        long size = 0;
        Iterable<FileMessage> all = fileMessageRepository.findAll();
        for (FileMessage fileMessage : all) {
            size += fileMessage.getSize();
        }
        System.out.println(size);
    }

}
