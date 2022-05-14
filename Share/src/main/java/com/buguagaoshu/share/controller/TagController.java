package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.repository.TagCacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2022-04-08 20:07
 */
@RestController
public class TagController {
    private final TagCacheRepository tagCacheRepository;

    @Autowired
    public TagController(TagCacheRepository tagCacheRepository) {
        this.tagCacheRepository = tagCacheRepository;
    }


    @GetMapping("/api/tag/list")
    public ResponseDetails getTagList() {
        return ResponseDetails.ok().put("data", tagCacheRepository.getTagList());
    }


    @PostMapping("/api/tag/save")
    public ResponseDetails save() {
        return ResponseDetails.ok();
    }
}
