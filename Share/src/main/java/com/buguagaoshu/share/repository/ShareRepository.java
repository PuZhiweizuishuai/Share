package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.Share;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;



/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-01 20:27
 */
public interface ShareRepository extends PagingAndSortingRepository<Share, Long>, CrudRepository<Share, Long> {
    Page<Share> findByDataLike(String key, Pageable pageable);

    Share findByUrl(String url);


}
