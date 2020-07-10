# AntVueBlogAdmin

> Vue.js+Egg.js+Mongodb的前后端分离的个人博客后台管理。

> 博客地址：[ANT](http://120.77.219.106/#/)


## 主要技术栈
后台管理：vue.js、vue-router、vuex

后端：Egg.js、Mongodb。[AntEggBlogService](https://github.com/antbaobao/AntEggBlogService)
前端：[AntVueBlogAdmin](https://github.com/antbaobao/AntVueBlogAdmin)

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
git clone git@github.com:antbaobao/AntVueBlogAdmin.git
```
安装依赖
```bash
cd AntVueBlogAdmin
npm i
```
运行

```bash
npm run dev
```
部署

部署流程可以参考[使用docker部署网站](https://github.com/antbaobao/AntBlog/issues/20)

### 效果展示

![](https://user-gold-cdn.xitu.io/2018/12/8/1678d0285a4304cf?w=2878&h=1628&f=png&s=470479)
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
│   │
│   ├─components      vue组件
│   │
│   ├─icons           图标
│   │
│   ├─router          路由
│   │
│   ├─styles          全局样式
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


## [1.0] - 2019-6-20
### Added
- 完成版本1.0


