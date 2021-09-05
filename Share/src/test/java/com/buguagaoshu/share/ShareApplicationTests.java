package com.buguagaoshu.share;

import com.buguagaoshu.share.domain.DiskMessage;
import com.buguagaoshu.share.domain.FileMessage;
import com.buguagaoshu.share.repository.DiskMessageRepository;
import com.buguagaoshu.share.repository.FileMessageRepository;
import com.buguagaoshu.share.repository.ShareRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.unit.DataSize;
import org.springframework.util.unit.DataUnit;

import java.io.File;
import java.util.List;

@SpringBootTest
class ShareApplicationTests {
    @Autowired
    ShareRepository repository;

    @Test
    void contextLoads() {

    }

}
