import request from '@/utils/request'

export function fetchArticle(params) {
  return request.get('/articles', params)
}

export function getArticleDetail(id) {
  return request.get(`/articles/${id}`)
}

export function createArticle(data) {
  return request.post('/articles', data)
}

export function updateArticle(id, data) {
  return request.put(`/articles/${id}`, data)
}

export function deleteArticle(id) {
  return request.delete(`/articles/${id}`)
}
