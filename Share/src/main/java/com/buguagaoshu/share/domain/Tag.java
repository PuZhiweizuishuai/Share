package com.buguagaoshu.share.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2021-07-30 23:01
 */
@Data
@Entity
@Table(name = "tag_table")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private Boolean lock;

    private String password;
}
