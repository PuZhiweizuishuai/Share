package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.FileMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-03 16:05
 */
public interface FileMessageRepository extends PagingAndSortingRepository<FileMessage, Long>, CrudRepository<FileMessage, Long> {
    FileMessage findByUrl(String url);
}
