package com.buguagaoshu.share.service;

import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.enums.ReturnCodeEnum;
import org.springframework.data.domain.Page;



/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-01 20:28
 */
public interface ShareService {
    Page<Share> findShareList(Integer page, Integer size, String key);

    Share getShareById(long id);

    Share getShareByUrl(String url);

    void save(Share share);

    ReturnCodeEnum delete(Share share);

    void update(Share share);
}
