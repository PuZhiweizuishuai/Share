package com.buguagaoshu.share.repository.impl;

import com.buguagaoshu.share.domain.IpData;
import com.buguagaoshu.share.repository.IpRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
@Service
public class InMemoryIpCache {
    private final IpRepository ipRepository;

    private static Iterable<IpData> whitelistIps;

    private static HashMap<String, IpData> whitelistIpMap = new HashMap<>();

    public InMemoryIpCache(IpRepository ipRepository) {
        this.ipRepository = ipRepository;
    }

    public void init() {
        Iterable<IpData> all = ipRepository.findAll();
        whitelistIps =  all;
        for (IpData ipData : all) {
            whitelistIpMap.put(ipData.getIp(), ipData);
        }
    }

    public void saveIp(String ip, String user) {
        IpData ipData = new IpData();
        ipData.setIp(ip);
        long time = System.currentTimeMillis();
        ipData.setCreateTime(time);
        ipData.setHasEnable(1);
        ipData.setModifyTime(time);
        ipData.setCreateUser(user);
        whitelistIpMap.put(ipData.getIp(), ipData);
        ipRepository.save(ipData);
    }

    public Map<String, IpData> getWhitelistIpMap() {
        return whitelistIpMap;
    }

    public Iterable<IpData> getWhitelistIps() {
        return whitelistIpMap.values();
    }

    public void deleteIp(IpData ip) {
        whitelistIpMap.remove(ip.getIp());
        ipRepository.delete(ip);
    }
}
