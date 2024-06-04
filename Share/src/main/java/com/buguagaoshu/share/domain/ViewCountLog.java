package com.buguagaoshu.share.domain;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-24
 * 文件分享历史记录查看
 */
@Data
@Entity
@Table(name = "view_table")
public class ViewCountLog {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * 0 share
     * 1 file
     * */
    private Integer type;

    private String ip;

    private String city;

    private String ua;

    /**
     * 文件或分享文本的ID
     * */
    private Long targetId;

    public Long viewTime;

}
