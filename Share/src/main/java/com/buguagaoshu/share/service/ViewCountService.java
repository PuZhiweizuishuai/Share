package com.buguagaoshu.share.service;

import com.buguagaoshu.share.domain.ViewCountLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-24
 */
public interface ViewCountService {
    Page<ViewCountLog> findByShareViewLog(Long shareOrFileId, Integer type, Integer page, Integer size);

    void addViewCountLog(int type, long shareOrFileId, String ip, String ua);
}
