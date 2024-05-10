package com.buguagaoshu.share.domain;

import lombok.Data;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-10
 */
@Data
public class LoginCount {
    private String ip;
    private int count;
    private long startTime;
}
