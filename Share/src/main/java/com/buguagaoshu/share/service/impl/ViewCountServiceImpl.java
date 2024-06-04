package com.buguagaoshu.share.service.impl;

import com.buguagaoshu.share.config.MyConfigProperties;
import com.buguagaoshu.share.domain.ViewCountLog;
import com.buguagaoshu.share.repository.ViewCountRepository;
import com.buguagaoshu.share.service.ViewCountService;
import org.lionsoul.ip2region.xdb.Searcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-24
 */
@Service
public class ViewCountServiceImpl implements ViewCountService {
    private final ViewCountRepository viewCountRepository;
    private final MyConfigProperties myConfigProperties;
    private final Searcher searcher;

    public ViewCountServiceImpl(ViewCountRepository viewCountRepository, MyConfigProperties myConfigProperties, Searcher searcher) {
        this.viewCountRepository = viewCountRepository;
        this.myConfigProperties = myConfigProperties;
        this.searcher = searcher;
    }

    @Override
    public Page<ViewCountLog> findByShareViewLog(Long shareOrFileId, Integer type, Integer page, Integer size) {
        if (page == null || page < 0) {
            page = 1;
        }
        if (size == null) {
            size = 20;
        }
        if (size > 100) {
            size = 100;
        }
        return viewCountRepository.findByTargetIdAndType(
                shareOrFileId,
                type,
                PageRequest.of(page - 1, size, Sort.by(Sort.Order.desc("viewTime"))));
    }

    @Override
    public void addViewCountLog(int type, long shareOrFileId, String ip, String ua) {
        ViewCountLog viewCountLog = new ViewCountLog();
        viewCountLog.setTargetId(shareOrFileId);
        viewCountLog.setIp(ip);
        if (myConfigProperties.getOpenIpAddress()) {
            try {
                viewCountLog.setCity(searcher.search(ip));
            } catch (Exception e) {
                viewCountLog.setCity("");
            }
        }
        viewCountLog.setUa(ua);
        viewCountLog.setType(type);
        viewCountLog.setViewTime(System.currentTimeMillis());
        viewCountRepository.save(viewCountLog);
    }
}
