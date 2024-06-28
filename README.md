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

## AI 功能配置指南

使用AI功能需要配置AI API接口，现在本项目使用的是 Cloudflare Workers 提供的 AI 调用能力，免费账户每天有一万次调用额度，非常够用

使用的 Workers 代码如下

```js
  
export default {
  async fetch(request, env) {
    /**
     * 设置为自己的密钥
     */
    const secretKey = "";
    /***
     * 跨域配置
     */
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
    };

    async function handleOptions(request) {
      if (
        request.headers.get("Origin") !== null &&
        request.headers.get("Access-Control-Request-Method") !== null &&
        request.headers.get("Access-Control-Request-Headers") !== null
      ) {
        // Handle CORS preflight requests.
        return new Response(null, {
          headers: {
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get(
              "Access-Control-Request-Headers"
            ),
          },
        });
      } else {
        // Handle standard OPTIONS request.
        return new Response(null, {
          headers: {
            Allow: "GET, HEAD, POST, OPTIONS",
          },
        });
      }
    }
    /**
     * 文字转图片
     */
    async function text2Image(userInput) {
      if (userInput.strength == null || userInput.strength == undefined) {
        userInput.strength = 1
      }
      if (userInput.guidance == null || userInput.guidance == undefined) {
        userInput.guidance = 7.5
      }
      const inputs = {
        prompt: userInput.prompt,
        guidance: userInput.guidance,
        strength: userInput.strength
      };
      const response = await env.AI.run(
        '@cf/stabilityai/stable-diffusion-xl-base-1.0',
        inputs,
      );
      return response;
    }

    /**
     * 翻译
     * @param userInput 用户输入参数
     */
    async function fanyi(userInput) {
      const inputs = {
        text: userInput.text,
        source_lang: userInput.sourceLang,
        target_lang: userInput.targetLang,
      }
      const response = await env.AI.run('@cf/meta/m2m100-1.2b', inputs);
      return { inputs, response }
    }

    /**
     * 摘要生成
     * 
    */
   async function bartText(userInput) {
    const response = await env.AI.run("@cf/facebook/bart-large-cnn", {
      input_text: userInput.inputText,
      max_length: userInput.maxLength
    });
    return response;
   }

    // 具体逻辑
    const url = new URL(request.url);
    
    if (request.method === 'OPTIONS') {
      const headers = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // 允许的方法
        'Access-Control-Max-Age': '86400', // 预检结果缓存时间，单位秒
      };
      // 根据请求来源设置允许访问的来源

      headers['Access-Control-Allow-Origin'] = '*'; // 默认允许所有来源访问
    
  
      // 返回预检响应
      return new Response(null, {
        headers: headers
      });
    }
  


    if (request.method === "POST") {
      //headers.set('Access-Control-Allow-Origin', '*');
      const contentType = request.headers.get("content-type");
      if (contentType.includes("application/json")) {
        // 读取用户请求
        const userInput = await request.json();
        // API认证
        if (userInput.secretKey !== secretKey) {
          return Response.json({ "msg" : "key error!" });
        }
        // 区分功能
        // 文字转图片
        if (url.pathname === '/api/text2image') {
          const img = await text2Image(userInput);
          return new Response(img, {
            headers: {
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
              'Access-Control-Allow-Origin':  '*',
              'content-type': 'image/png',
            },
          });
          // 翻译
        } else if (url.pathname === '/api/fanyi') {
          const res = await fanyi(userInput);
          return new Response(JSON.stringify(res), {
            headers: {
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
              'Access-Control-Allow-Origin':  '*',
              'content-type': 'application/json; charset=UTF-8',
            },
          })
        } else if (url.pathname === '/api/bart') {
          const res = await bartText(userInput)
          return new Response(JSON.stringify(res), {
            headers: {
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
              'Access-Control-Allow-Origin':  '*',
              'content-type': 'application/json; charset=UTF-8',
            }
          })
        }
      }
    }
  },
};

```

之后再sysinfo页面，配置相关API设置即可

格式如下

```json
{
      "text2Image": "https://*/api/text2image",
      "fanyi": "https://*/api/fanyi",
      "bart": "https://*/api/bart",
      "secretKey": " "
}
```


## 注意

文件上传服务默认最大上传文件大小为100M，如需扩大，可以进入设置进行修改

## 更新

### 2024-06-28

新增 AI 画图，翻译，摘要生成功能

### 2024-06-04

新增访问日志增加设备信息记录

### 2024-05-25

新增访问日志功能

### 2024-05-11

增加对外分享功能

### 2024-05-09

升级前端为Vue3与Vuetify3，重新构建全新前端

升级后端Java版本为Java17

增加安全访问控制选项

### 2020-12-8

优化文件上传大小设置，更新依赖，添加音乐解密模块

