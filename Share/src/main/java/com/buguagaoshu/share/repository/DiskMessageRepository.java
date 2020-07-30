package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.DiskMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-08 20:12
 */
@Repository
public interface DiskMessageRepository extends CrudRepository<DiskMessage, Integer> {
}
