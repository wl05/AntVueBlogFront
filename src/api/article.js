import _request from '@/utils/request'

export function fetchArticle(params) {
    return _request.get('/articles', params)
}

export function getArticleDetail(id) {
    return _request.get(`/articles/${id}`)
}

export function createArticle(data) {
    return _request.post('/articles', data)
}

export function updateArticle(id, data) {
    return _request.put(`/articles/${id}`, data)
}

export function deleteArticle(id) {
    return _request.delete(`/articles/${id}`)
}
