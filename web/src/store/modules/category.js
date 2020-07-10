import { countCategotres } from '@/api/category'
import { getArticlesByCategory } from '@/api/article'

const category = {
    state: {
        categories: [],
        categoryArticle: [],
        total: 0,
        pageSize: 0,
        pageLimit: 0,
        from: -1
    },
    mutations: {
        SAVE_CATEGORIES: (state, categories) => {
            state.categories = categories
        },
        SAVE_CATEGORY_ARTICLE: (state, data) => {
            const { articleList, total, pageSize, pageLimit } = data
            state.categoryArticle = articleList
            state.total = total
            state.pageSize = pageSize
            state.pageLimit = pageLimit
        },
        SAVE_CATEGORIES_FROM: (state, from) => {
            state.from = from
        }
    },
    actions: {
        FETCH_CATEGORIES: ({ commit }) => {
            return new Promise((resolve, reject) => {
                countCategotres()
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_CATEGORIES', data.data)
                            resolve(response)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GET_ARTICLE_BY_CATEGORY: ({ commit, dispatch, state }, data) => {
            const { category, pageSize, pageLimit } = data
            return new Promise((resolve, reject) => {
                getArticlesByCategory(category, pageSize, pageLimit)
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_CATEGORY_ARTICLE', {
                                articleList: data.data.article,
                                total: data.data.count,
                                pageSize,
                                pageLimit
                            })
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

export default category
