package com.buguagaoshu.share;


import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.FileMessageRepository;
import com.buguagaoshu.share.repository.FileRepository;
import com.buguagaoshu.share.repository.ShareRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
class ShareApplicationTests {
    @Autowired
    FileMessageRepository fileMessageRepository;

    @Autowired
    DiskMessageRepository diskMessageRepository;

    @Test
    void contextLoads() {
        Iterable<FileMessage> all = fileMessageRepository.findAll();

        long size = 0;
        for (FileMessage fileMessage : all) {
            size += fileMessage.getSize();
        }

        System.out.println(size);
    }

}
