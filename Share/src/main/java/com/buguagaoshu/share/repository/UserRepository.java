package com.buguagaoshu.share.repository;

import com.buguagaoshu.share.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
public interface UserRepository extends CrudRepository<User, Long>, PagingAndSortingRepository<User, Long> {
    User findAllByUsername(String name);
}
