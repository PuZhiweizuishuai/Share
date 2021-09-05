package com.buguagaoshu.share.domain;

import lombok.Data;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2021-07-30 23:01
 */
@Data
public class Tag {
    private Integer id;

    private String title;

    private Integer hasPassword;

    private String password;
}
