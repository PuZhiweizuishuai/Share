package com.buguagaoshu.share.repository.impl;

import com.buguagaoshu.share.domain.Tag;
import com.buguagaoshu.share.repository.TagCacheRepository;
import com.buguagaoshu.share.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2022-04-08 19:57
 */
@Repository
public class InMemoryTagCacheImpl implements TagCacheRepository {
    private final HashMap<Long, Tag> tagHashMap = new HashMap<>();

    private ArrayList<Tag> tagList = new ArrayList<>();

    private final  TagRepository tagRepository;

    @Autowired
    public InMemoryTagCacheImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public void initTagMap() {
        Iterable<Tag> all = tagRepository.findAll();
        for (Tag tag : all) {
            tagHashMap.put(tag.getId(), tag);
        }
    }

    @Override
    public void initTagList() {
        Iterable<Tag> all = tagRepository.findAll();
        for (Tag tag : all) {
            tag.setPassword("");
            tagList.add(tag);
        }
    }

    @Override
    public HashMap<Long, Tag> getTagMap() {
        return tagHashMap;
    }

    @Override
    public ArrayList<Tag> getTagList() {
        return tagList;
    }
}
