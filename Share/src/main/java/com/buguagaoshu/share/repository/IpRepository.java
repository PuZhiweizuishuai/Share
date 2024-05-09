package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.IpData;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 * ip白名单查询使用
 */
public interface IpRepository extends CrudRepository<IpData, String> {
}
