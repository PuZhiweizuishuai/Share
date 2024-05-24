package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.ViewCountLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-24
 */
public interface ViewCountRepository extends PagingAndSortingRepository<ViewCountLog, Long>, CrudRepository<ViewCountLog, Long> {
    Page<ViewCountLog> findByTargetIdAndType(Long targetId, Integer type,Pageable pageable);

}
