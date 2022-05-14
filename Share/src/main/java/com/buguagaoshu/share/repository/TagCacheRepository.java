package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.Tag;

import java.util.ArrayList;
import java.util.HashMap;


/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2022-04-08 19:55
 * TagRepository
 */
public interface TagCacheRepository {
    void initTagMap();

    void initTagList();

    HashMap<Long, Tag> getTagMap();

    ArrayList<Tag> getTagList();
}
