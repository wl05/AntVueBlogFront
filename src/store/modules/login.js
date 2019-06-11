import { login } from '@/api/user'

const loginStore = {
  state: {},
  mutations: {
    SAVE_USER_INFO: (state, detail) => {
      state.detail = detail
    },
  },
  actions: {
    LOGIN: ({commit, dispatch, state}) => {
      return new Promise((resolve, reject) => {
          login()
          .then(response => {
            const data = response.data
            if (data.code) {
              commit('SAVE_USER_INFO', data.data)
              localStorage.setItem('token', data.data.token)
            }
            reject(response)
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
