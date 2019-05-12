import { getArticleDetail } from '@/api/article'

const detail = {
    state: {
        detail: '',
    },
    mutations: {
        SAVE_ARTICLE_DETAIL: (state, detail) => {
            state.detail = detail
        },
    },
    actions: {
        FETCH_ARTICLE_DETAIL: ({ commit, dispatch, state }, id) => {
            return new Promise((resolve, reject) => {
                getArticleDetail(id)
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_ARTICLE_DETAIL', data.data)
                            resolve(response)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    },
}

export default detail
