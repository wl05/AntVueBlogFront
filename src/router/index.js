import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [ {
    path: '/',
    name: 'ArticlesList',
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
    },
    {
      path: '/archive/:timeline',
      name: 'ArchiveTimeline',
      component: () =>
        import('@/views/archives/archiveTimeRange')
    },
  
  ]
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
