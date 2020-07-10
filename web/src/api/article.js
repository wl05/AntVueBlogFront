import request from '@/utils/request'

export function fetchArticle(params) {
  return request.get('/articles', params)
}

export function getArticleDetail(id) {
  return request.get(`/articles/${id}`)
}

export function getArticlesByTag(id) {
  return request.get(`/articles/tags/${id}`)
}

export function getArticlesByKeywords(keywords = '', pageSize = 0, pageLimit = 0) {
  return request.get(`/articles/keywords?keywords=${keywords}&pageSize=${pageSize}&pageLimit=${pageLimit}`)
}

export function getArticlesByCategory(category, pageSize = 0, pageLimit = 0) {
  return request.get(`/articles/category/${category}?pageSize=${pageSize}&pageLimit=${pageLimit}`)
}

export function fetchArchives() {
  return request.get('/archives')
}

export function getArticlesByArchives({ pageSize = 0, pageLimit = 0, timeline }) {
  return request.get(`/archives/${timeline}?pageSize=${pageSize}&pageLimit=${pageLimit}`)
}
