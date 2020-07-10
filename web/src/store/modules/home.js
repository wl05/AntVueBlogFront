import { fetchArticle, fetchArchives } from '@/api/article'
const home = {
    state: {
        articleList: [],
        total: 0,
        pageSize: 0,
        pageLimit: 0,
        from: -1,
        newestArticle: [],
        archives: []
    },
    mutations: {
        SAVE_ARTICLE_DATA: (state, articleData) => {
            const { articleList, pageSize, total, pageLimit } = articleData
            state.articleList = articleList
            state.total = total
            state.pageSize = pageSize
            state.pageLimit = pageLimit
        },
        SAVE_FROM: (state, from) => {
            state.from = from
        },
        SAVE_NEWEST_ARTICLE: (state, newestArticle) => {
            state.newestArticle = newestArticle
        },
        SAVE_ARCHIVES: (state, archives) => {
            state.archives = archives
        }
    },
    actions: {
        FETCH_ARTICLE: ({ commit, dispatch, state }, condition) => {
            return new Promise((resolve, reject) => {
                fetchArticle(condition)
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_ARTICLE_DATA', {
                                articleList: data.data.article,
                                total: data.data.count,
                                pageSize: condition.pageSize,
                                pageLimit: condition.pageLimit,
                            })
                            resolve(response)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        FETCH_NEWEST_ARTICLE: ({ commit }) => {
            return new Promise((resolve, reject) => {
                fetchArticle({ pageSize: 1, pageLimit: 10 })
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_NEWEST_ARTICLE', data.data.article)
                            resolve(response)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        FETCH_ARCHIVES: ({ commit }) => {
            return new Promise((resolve, reject) => {
                fetchArchives()
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_ARCHIVES', data.data)
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

export default home
