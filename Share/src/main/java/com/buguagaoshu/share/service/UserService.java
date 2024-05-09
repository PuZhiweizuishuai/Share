package com.buguagaoshu.share.service;

import com.buguagaoshu.share.domain.User;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
public interface UserService {
    void save(User user);

    User findByUsername(String username);

    User login(User user);

    User changePassword(User user);
}
