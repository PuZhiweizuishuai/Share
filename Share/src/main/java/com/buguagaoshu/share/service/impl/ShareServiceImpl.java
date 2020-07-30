package com.buguagaoshu.share.service.impl;

import com.buguagaoshu.share.domain.Share;
import com.buguagaoshu.share.enums.ReturnCodeEnum;
import com.buguagaoshu.share.repository.ShareRepository;
import com.buguagaoshu.share.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;


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
        if (!StringUtils.isEmpty(key)) {
            List<Share> shares = shareRepository.findByDataLike("%" + key + "%");
            Collections.reverse(shares);
            int length = shares.size();
            Page<Share> sharePage = new Page<Share>() {
                @Override
                public int getTotalPages() {
                    return 1;
                }

                @Override
                public long getTotalElements() {
                    return length;
                }

                @Override
                public <U> Page<U> map(Function<? super Share, ? extends U> converter) {
                    return null;
                }

                @Override
                public int getNumber() {
                    return length;
                }

                @Override
                public int getSize() {
                    return length;
                }

                @Override
                public int getNumberOfElements() {
                    return length;
                }

                @Override
                public List<Share> getContent() {
                    return shares;
                }

                @Override
                public boolean hasContent() {
                    return false;
                }

                @Override
                public Sort getSort() {
                    return null;
                }

                @Override
                public boolean isFirst() {
                    return false;
                }

                @Override
                public boolean isLast() {
                    return false;
                }

                @Override
                public boolean hasNext() {
                    return false;
                }

                @Override
                public boolean hasPrevious() {
                    return false;
                }

                @Override
                public Pageable nextPageable() {
                    return null;
                }

                @Override
                public Pageable previousPageable() {
                    return null;
                }

                @Override
                public Iterator<Share> iterator() {
                    return null;
                }
            };
            return sharePage;
        }
        Page<Share> shares =
                shareRepository.findAll(
                        PageRequest.of(page - 1, size, Sort.by(Sort.Order.desc("createTime")))
                );
        return shares;
    }

    @Override
    public void save(Share share) {
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
}
