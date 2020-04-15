import { login, getUserInfo } from '@/api/user'


const loginStore = {
  state: {
    userInfo: null
  },
  mutations: {
    SAVE_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    LOGIN: ({ commit, dispatch, state }, { email, password }) => {
      return new Promise((resolve, reject) => {
        login({ email, password })
          .then(response => {
            const data = response.data
            if (data.code === 0) {
              localStorage.setItem('token', data.data.token)
              resolve(response)
            } else {
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      }
      )
    },
    GET_USER_INFO: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            const data = response.data
            if (data.code === 0) {
              commit('SAVE_USER_INFO', data.data)
              resolve(response)
            } else {
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      }
      )
    },
  },

}

export default loginStore
