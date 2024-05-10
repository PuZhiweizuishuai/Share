package com.buguagaoshu.share.domain;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
@Data
@Entity
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String username;

    private String password;

    private String nickname;

    private String email;

    private Long createTime;

    @Transient
    private String oldPassword;
}
