package com.buguagaoshu.share.domain;

import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.Id;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * create          2020-07-08 20:09
 */
@Data
@Entity
public class DiskMessage {
    @Id
    private Integer id;

    private Long userDisk;

    private Long availableDisk;

    private Long uploadFileMax;

    private Integer editType;

}
