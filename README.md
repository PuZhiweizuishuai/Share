<div align="center">
<img src="/img/logo.png" alt="logo" title="logo" width="50%" style="text-align:center;">
</div>

# 分享点啥 Share

**局域网文件分享工具 LAN file sharing tool（你要是部署在公网也行，估计有安全问题**

## 开发原因

开发这个小工具主要是为了方便我在局域网内对于多设备间进行文本文件共享。以前我在手机上看到的东西，想要发给电脑，都是用的QQ的手机和电脑间的文件传输。但有时候又不想打开电脑QQ，这时候传文本就很难受了，一时也想不到什么好办法。对于文件还好，直接用ftp，但是对于文字就不怎么好用了，于是我就搞了一个这个，部署在树莓派上，有什么文本想法，直接发到这个上面就好。极大的方便了我多设备间的文本共享。

音乐解密模块来自：https://github.com/ix64/unlock-music


## 截图 screenshot

### 分享列表

![分享列表](/img/share.png "分享列表")

### 文件列表


![文件管理](/img/filelist.png "文件管理")


### Vditor Markdown 编辑器

![vditor](/img/vditor.png "vditor")

### wangeditor HTML 编辑器

![wangeditor](/img/wangeditor.png "wangeditor")

### 编辑器切换设置

![setting](/img/setting.png "setting")

## 快速运行

运行环境：Java 17

后端： Spring Boot + JPA

数据库： Mysql

前端框架： Vue + vuetifyjs

```
cd Share
mvn clean package
java -jar share-*.jar
```

你也可以直接下载运行

https://github.com/PuZhiweizuishuai/Share/releases


中国大陆下载加速

https://gitee.com/puzhiweizuishuai/Share/releases

## 使用指南

初始账号admin，密码为123456

第一次使用请到sysinfo目录下尽快更改

**第一次使用请到设置页面配置编辑器，不然可能出现不显示编辑器的问题**


## 注意

文件上传服务默认最大上传文件大小为100M，如需扩大，可以进入设置进行修改

## 更新

### 2024-05-11

增加对外分享功能

### 2024-05-09

升级前端为Vue3与Vuetify3，重新构建全新前端

升级后端Java版本为Java17

增加安全访问控制选项

### 2020-12-8

优化文件上传大小设置，更新依赖，添加音乐解密模块

