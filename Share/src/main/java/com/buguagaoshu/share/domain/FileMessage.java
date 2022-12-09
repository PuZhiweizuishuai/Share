package com.buguagaoshu.share.domain;

import lombok.Data;

import jakarta.persistence.*;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-03 15:22
 */
@Data
@Entity
@Table(name = "file_table")
public class FileMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 原文件名
     * */
    private String uploadFilename;

    /**
     * 存储的文件名
     * */
    private String filename;

    private Long size;

    /**
     * 保存路径
     * */
    private String path;

    /**
     * 文件所属路径时间
     * */
    private String date;


    private Long createTime;
}
