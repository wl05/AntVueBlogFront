import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/views/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/article/detail'),
    meta: { title: '文章详情', icon: 'tree' }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/create',
    name: 'Article',
    meta: { title: '文章', icon: 'nested' },
    children: [
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/views/article/create'),
        meta: { title: '发布文章', icon: 'edit' }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/tags',
    component: Layout,
    name: 'Tags',
    children: [
      {
        path: 'create',
        name: 'TagsCreate',
        component: () => import('@/views/tags/tags'),
        meta: { title: '标签', icon: 'table' }
      }
    ]
  },
  {
    path: '/categories',
    component: Layout,
    name: 'Categories',
    children: [
      {
        path: 'create',
        name: 'CategoriesCreate',
        component: () => import('@/views/categories/categories'),
        meta: { title: '分类', icon: 'star' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    children: [
      {
        path: 'create',
        name: 'UserCreate',
        component: () => import('@/views/user/list'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
