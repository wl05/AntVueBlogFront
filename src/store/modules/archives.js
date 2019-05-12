import { getArticlesByArchives } from '@/api/article'

const category = {
    state: {
        archivesArticle: [],
        total: 0,
        pageSize: 0,
        pageLimit: 0,
        from: -1
    },
    mutations: {
        SAVE_ARCHIVES_ARTICLE: (state, data) => {
            const { articleList, total, pageSize, pageLimit } = data
            state.archivesArticle = articleList
            state.total = total
            state.pageSize = pageSize
            state.pageLimit = pageLimit
        },
        SAVE_ARCHIVES_FROM: (state, from) => {
            state.from = from
        }
    },
    actions: {
        GET_ARTICLE_BY_ARCHIVES: ({ commit, dispatch, state }, data) => {
            const { timeline, pageSize, pageLimit } = data
            return new Promise((resolve, reject) => {
                getArticlesByArchives(timeline, pageSize, pageLimit)
                    .then(response => {
                        const data = response.data
                        if (data.code) {
                            reject(response)
                        } else {
                            commit('SAVE_ARCHIVES_ARTICLE', {
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
