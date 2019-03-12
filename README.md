# AntVueBlogFront

> Vue.js+Egg.js+Mongodb的前后端分离的个人博客。

> 博客地址：[ANT](http://120.77.219.106:8080/) （博客已经更新为ssr渲染，重构了前端页面）

## 主要技术栈

* 前端：vue.js、vue-router、vuex [AntVueBlogFront](https://github.com/antbaobao/AntVueBlogFront)
* 后端：Egg.js、Mongodb [AntEggBlogService](https://github.com/antbaobao/AntEggBlogService)
* 后台管理: vue.js、vue-router、vuex [AntVueBlogAdmin](https://github.com/antbaobao/AntVueBlogAdmin)

## 博客功能
### 前台页面
- 文档列表
- 分类
- 标签
- 评论

### 后台管理
- 发布文章、存为草稿
- 文章管理
- 标签管理
- 分类管理
- 登录验证

## Setup

运行环境
- node.js
- mongoDB

克隆远程库
```bash
git clone git@github.com:antbaobao/AntVueBlogFront.git
```
安装依赖
```bash
cd AntVueBlogFront
npm i
```
运行
```bash
npm run dev
```

### 效果展示
#### 前端页面

首页

![首页](https://user-gold-cdn.xitu.io/2018/12/1/1676572119695679?w=2878&h=1576&f=jpeg&s=841444)

分类

![分类](https://user-gold-cdn.xitu.io/2018/12/1/1676573f518d65c9?w=2878&h=1574&f=jpeg&s=855442)

归档

![归档](https://user-gold-cdn.xitu.io/2018/12/1/1676570c62745466?w=2878&h=1574&f=jpeg&s=743367)

标签

![标签](https://user-gold-cdn.xitu.io/2018/12/1/16765683665250c4?w=2878&h=1572&f=jpeg&s=965756)

文章详情

![文章详情](https://user-gold-cdn.xitu.io/2018/12/1/167657ac611ff898?w=2876&h=1572&f=jpeg&s=666548)

评论

![评论](https://user-gold-cdn.xitu.io/2018/12/1/167657b4c9fabf9c?w=2878&h=1124&f=jpeg&s=409908)


移动端

![移动端](https://user-gold-cdn.xitu.io/2018/12/1/16765764348e3481?w=1080&h=2244&f=jpeg&s=1059950)
### 目录
```
│  .babelrc             babel配置
│  .editorconfig        编辑器配置
│  .eslintignore        eslint忽略
│  .eslintrc.js         eslintrc配置
│  .gitignore           git上传忽略
│  .postcssrc.js
│  Dockerfile           docker 配置
│  index.html           打包模板
│  package.json
│  README.md
│
├─build
├─src
│   │  main.js        项目入口
│   │  App.vue          根组件
│   │  index.css      全局样式
│   │
│   ├─api             api 请求接口
│   │
│   ├─assets          外部引用文件
│   │  ├─css
│   │  └─js
│   │
│   ├─components      vue组件
│   │
│   ├─ layout         页面公共结构
│   │
│   ├─store           vuex文件
│   │
│   ├─utils           工具函数
│   │
│   └─views           页面vue文件
│
├─test
└─static            静态文件
```


### TODO
- 服务端渲染(SSR)
- 很多细节需要优化，有空再继续撸
(完)

