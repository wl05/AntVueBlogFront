import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AboutMe from '@/components/AboutMe'
// import asasa from '@/view/articles/list'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: () => import ('@/views/articles/list'),
		},
		{
			path: '/article/detail/:id',
			name: 'Detail',
			component: () => import ('@/views/articles/detail'),
		},
		{
			path: '/about',
			name: 'AboutMe',
			component: () => import ('@/views/about/about'),
		},
		{
			path: '/tags',
			name: 'Tags',
			component: () => import ('@/views/tags/tags'),
		},
		{
			path: '/categories',
			name: 'Categories',
			component: () => import ('@/views/categories/categories'),
		},
		{
			path: '/archives',
			name: 'Archives',
			component: () => import ('@/views/archives/archives'),
		},
	
	]
})
