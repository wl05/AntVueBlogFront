import { login, getInfo } from '@/api/login'

const user = {
  namespaced: true,
  state: {
    name: '',
    avatar: '',
    role: '' // 普通权限都为0，目前角色只有admin 1
  },
  mutations: {
    SET_USER_INFO: (state, info) => {
      state.name = info.name
      state.avatar = info.avatar
      state.role = info.role
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token')
      location.reload()
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        login(email, userInfo.password)
          .then(response => {
            const data = response.data
            if (!data.code) {
              localStorage.setItem('token', data.data.token)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data
            commit('SET_USER_INFO', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
