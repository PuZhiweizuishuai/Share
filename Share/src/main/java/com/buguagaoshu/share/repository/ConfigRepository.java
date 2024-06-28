package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.ConfigData;
import com.buguagaoshu.share.domain.Share;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-06-28
 */
public interface ConfigRepository extends PagingAndSortingRepository<ConfigData, Long>, CrudRepository<ConfigData, Long> {
    ConfigData findByName(String name);
}
