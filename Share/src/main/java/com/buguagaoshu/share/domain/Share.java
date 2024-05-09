package com.buguagaoshu.share.domain;

import lombok.Data;

import jakarta.persistence.*;

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

    private Long tagId;

    private Boolean lock;


    private String password;

    /**
     * 编辑器类型
     * 默认为 0
     * 0 Vditor https://ld246.com/article/1549638745630
     * 1 wangEditor https://www.wangeditor.com/
     * */
    private Integer editType;

    @Transient
    private Tag tag;
}
