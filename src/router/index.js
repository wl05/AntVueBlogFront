import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: () =>
                import('@/views/articles/list')
  },
  {
    path: '/article/detail/:id',
    name: 'Detail',
    component: () =>
                import('@/views/articles/detail')
  },
  {
    path: '/about',
    name: 'AboutMe',
    component: () =>
                import('@/views/about/about')
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () =>
                import('@/views/tags/tags')
  },
  {
    path: '/tags/:id',
    name: 'TagsItem',
    component: () =>
                import('@/views/tags/tagsItem')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () =>
                import('@/views/categories/categories')
  },
  {
    path: '/categories/:id',
    name: 'CategoryItem',
    component: () =>
                import('@/views/categories/categoryItem')
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () =>
                import('@/views/archives/archives')
  }

  ]
})
