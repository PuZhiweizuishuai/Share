package com.buguagaoshu.share.domain;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
@Data
@Entity
@Table(name = "ip_table")
public class IpData {
    @Id
    public String ip;

    private String createUser;

    private Long createTime;

    private Long modifyTime;

    public Integer hasEnable;
}
