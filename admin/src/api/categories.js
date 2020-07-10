import request from '@/utils/request'

export function create(name) {
  return request.post('/categories', { name })
}

export function getCategories() {
  return request.get('/categories')
}

export function deleteCategory(id) {
  return request.delete(`/categories/${id}`)
}

export function update(id, name) {
  return request.put(`/categories/${id}`, { name })
}
