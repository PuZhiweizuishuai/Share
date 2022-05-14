package com.buguagaoshu.share.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2022-04-19 19:50
 */
@RestController
public class TestController {
    @GetMapping("/api/test")
    public String name(Integer page, String key) {
        return  "页码：" + page + "  查询字符："  + key;
    }
}
