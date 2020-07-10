import { fetchArticle } from '@/api/article'

const article = {
  namespaced: true,
  state: {
    articleList: null,
    count: 0
  },

  mutations: {
    SET_ARTICLE_LIST: (state, articleList) => {
      state.articleList = articleList
    },
    SET_COUNT: (state, count) => {
      state.count = count
    }
  },
  actions: {
    // 获取用户信息
    FetchArticle({ commit, state }, condition) {
      return new Promise((resolve, reject) => {
        fetchArticle(condition)
          .then(response => {
            const data = response.data
            if (data.code) {
              reject(response)
            } else {
              commit('SET_ARTICLE_LIST', data.data.article)
              commit('SET_COUNT', data.data.count)
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default article
