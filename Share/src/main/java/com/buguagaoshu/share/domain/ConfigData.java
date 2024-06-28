package com.buguagaoshu.share.domain;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-06-28
 */
@Data
@Entity
@Table(name = "config_table")
public class ConfigData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String configMessage;

    private Integer type;

    private Long createTime;

    private Long updateTime;
}
