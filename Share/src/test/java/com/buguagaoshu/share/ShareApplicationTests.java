package com.buguagaoshu.share;


import com.buguagaoshu.share.repository.ShareRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ShareApplicationTests {
    @Autowired
    ShareRepository repository;

    @Test
    void contextLoads() {

    }

}
