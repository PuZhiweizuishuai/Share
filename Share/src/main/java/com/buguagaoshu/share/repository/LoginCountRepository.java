package com.buguagaoshu.share.repository;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
public interface LoginCountRepository {
    void addLoginCount(String loginIp);

    int getLoginCount(String loginIp);

    Boolean checkLoginCount(String loginIp);

    Boolean deleteLoginCount(String loginIp);


    void clean();
}
