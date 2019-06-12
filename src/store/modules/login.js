import { login } from '@/api/user'

const loginStore = {
  state: {
    usrInfo: {}
  },
  mutations: {
    SAVE_USER_INFO: (state, usrInfo) => {
      state.usrInfo = usrInfo
    },
  },
  actions: {
    LOGIN: ({commit, dispatch, state}, {email, password}) => {
      return new Promise((resolve, reject) => {
          login({email, password})
          .then(response => {
            const data = response.data
            if (data.code === 0) {
              commit('SAVE_USER_INFO', data.data)
              localStorage.setItem('token', data.data.token)
              resolve(response)
            } else {
              reject(response)
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
