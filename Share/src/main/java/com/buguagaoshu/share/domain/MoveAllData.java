package com.buguagaoshu.share.domain;

import lombok.Data;

import java.util.List;

/**
 * 全表数据迁移 DTO，与 Go 后端 model.MoveAllData 结构对齐。
 * 用于 GET /api/admin/move/all 导出 与 POST /api/admin/move/all/save 导入，
 * 方便 Spring 与 Go 两个后端之间相互迁移数据。
 *
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2026-07-28
 */
@Data
public class MoveAllData {
    /** 用户表 user_table */
    private List<User> users;
    /** 标签表 tag_table */
    private List<Tag> tags;
    /** 配置表 config_table */
    private List<ConfigData> configs;
    /** IP 白名单表 ip_table */
    private List<IpData> whitelist;
    /** 访问日志表 view_table */
    private List<ViewCountLog> viewlogs;
    /** 磁盘信息单例（id=1） */
    private DiskMessage disk;
    /** 分享表 share_table */
    private List<Share> share;
    /** 文件表 file_table */
    private List<FileMessage> file;
}
