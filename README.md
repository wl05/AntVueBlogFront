# AntVueBlogFront

> Vue.js+Egg.js+Mongodb前后端分离的个人网站博客。

> 博客地址:[ANT](http://182.254.168.74) （ssr渲染参考[AntVueBlogFrontSSR](https://github.com/antbaobao/AntVueBlogFrontSSR)）

## 主要技术栈

* 前端：vue.js、vue-router、vuex [AntVueBlogFront](https://github.com/antbaobao/AntVueBlogFront)
* 后端：Egg.js、Mongodb [AntEggBlogService](https://github.com/antbaobao/AntEggBlogService)
* 后台管理: vue.js、vue-router、vuex [AntVueBlogAdmin](https://github.com/antbaobao/AntVueBlogAdmin)

## 博客功能
### 前台页面
- 文档列表
- 分类
- 标签
- 归档
- 评论（暂时关闭）
- 文章检索

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

## 部署

部署流程可以参考[使用docker部署网站](https://github.com/antbaobao/AntBlog/issues/20)

## 待开发
1. 准备开发注册登录权限管理系统
2. 新增"生活与我"模块，加入权限控制。
3. 准备用ts改造
4. 用微前端的架构把admin整合进来

## [1.0] - 2019-06-20
### Changed
- 优化了页面样式

## todo
加入登录鉴权，权限控制

## [0.9] - 2019-05-31
### Changed
- 优化了页面跳转
- 优化了CSS的命名使用BEM命名规则


## [0.81] - 2019-05-15
### Added
- 新增了全文检索功能

### Changed
- 重构了整个前端页面，包括页面背景，首页布局。

### Fixed
- 修复了路由跳转的bug

## todo
重构页面后移动端适配还没做


## 遗留bug

1. 我部署到服务器后首次访问页面首次点击页面跳转会卡顿一下，然后后面点击就正常了，我在本地开发的时候没有遇到这样的问题，这个问题困扰了我很久，如果有知道的朋友望告知。
