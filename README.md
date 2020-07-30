<div align="center">
<img src="http://p.ananas.chaoxing.com/star3/origin/59f04f31a33f78205298f5a1d4600471.png" alt="logo" title="logo" width="50%" style="text-align:center;">
</div>

# 分享点啥 Share

**局域网文件分享工具 LAN file sharing tool（你要是部署在公网也行，估计有安全问题**

## 开发原因

开发这个小工具主要是为了方便我在局域网内对于多设备间进行文本文件共享。以前我在手机上看到的东西，想要发给电脑，都是用的QQ的手机和电脑间的文件传输。但有时候又不想打开电脑QQ，这时候传文本就很难受了，一时也想不到什么好办法。对于文件还好，直接用ftp，但是对于文字就不怎么好用了，于是我就搞了一个这个，部署在树莓派上，有什么文本想法，直接发到这个上面就好。极大的方便了我多设备间的文本共享。


## 截图 screenshot

![分享列表](http://p.ananas.chaoxing.com/star3/origin/75c50b740f4c406a9dbe3b8d34f7edc8.png "分享列表")

![文件管理](http://p.ananas.chaoxing.com/star3/origin/9ca68f8922183ab69cac1ecfd5c16623.png "文件管理")

![分享](http://p.ananas.chaoxing.com/star3/origin/d3bc5beab83edd7c1445b49faf279f84.png "分享")

## 快速运行

运行环境：Java 11

后端： Spring Boot + JPA

数据库： Mysql

前端框架： Vue + vuetifyjs

```
cd Share
mvn clean package
java -jar share-0.0.1-SNAPSHOT.jar
```

你也可以直接下载运行

https://github.com/PuZhiweizuishuai/Share/releases/tag/v1.6

## 注意

文件上传服务我设置的最大文件大小为100M，过大的文件这么传没有意义，直接用FTP或其它文件传输协议就好

