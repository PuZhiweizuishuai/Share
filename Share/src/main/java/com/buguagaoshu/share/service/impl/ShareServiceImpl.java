package com.buguagaoshu.share.service.impl;

import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.enums.ReturnCodeEnum;
import com.buguagaoshu.share.repository.ShareRepository;
import com.buguagaoshu.share.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-01 20:30
 */
@Service
public class ShareServiceImpl implements ShareService {

    private final ShareRepository shareRepository;

    @Autowired
    public ShareServiceImpl(ShareRepository shareRepository) {
        this.shareRepository = shareRepository;
    }

    @Override
    public Page<Share> findShareList(Integer page, Integer size, String key) {
        if (page == null || page < 0) {
            page = 1;
        }
        if (size == null) {
            size = 20;
        }
        if (size > 100) {
            size = 100;
        }
        if (StringUtils.hasLength(key)) {
            return shareRepository.findByDataLike("%" + key + "%", PageRequest.of(page - 1, size, Sort.by(Sort.Order.desc("createTime"))));
        }
        return shareRepository.findAll(
                PageRequest.of(page - 1, size, Sort.by(Sort.Order.desc("createTime")))
        );
    }

    @Override
    public void save(Share share) {
        if (share.getId() != null) {
            throw new RuntimeException("保存失败！");
        }
        share.setCreateTime(System.currentTimeMillis());
        shareRepository.save(share);
    }

    @Override
    public ReturnCodeEnum delete(Share share) {
        if (share.getId() == null || share.getId() < 0) {
            return ReturnCodeEnum.ERROR_SHARE_ID;
        }
        shareRepository.delete(share);
        return ReturnCodeEnum.SUCCESS;
    }

    @Override
    public void update(Share share) {
        return;
    }
}
