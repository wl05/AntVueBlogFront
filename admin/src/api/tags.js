import request from '@/utils/request'

export function create(name) {
  return request.post('/tags', { name })
}

export function getList() {
  return request.get('/tags')
}

export function deleteTag(id) {
  return request.delete(`/tags/${id}`)
}

export function updateTag(id, name) {
  return request.put(`/tags/${id}`, { name })
}
