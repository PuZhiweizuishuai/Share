package com.buguagaoshu.share.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-01 20:24
 */
@Data
@Entity
@Table(name = "share_table")
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(columnDefinition = "longtext")
    private String data;

    private Long createTime;
}
