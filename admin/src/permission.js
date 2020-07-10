import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (localStorage.getItem('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      if (!store.state.user.role) {
        store
          .dispatch('user/GetInfo')
          .then(res => {
            // 拉取用户信息
            if (res.data.code === 'error_003') {
              // token过期
              store.dispatch('user/FedLogOut').then(() => {
                Message.error('鉴权失败')
                next({ path: '/' })
              })
            } else {
              next()
            }
          })
          .catch(err => {
            store.dispatch('user/FedLogOut').then(() => {
              Message.error(err || '鉴权失败')
              next({ path: '/' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
