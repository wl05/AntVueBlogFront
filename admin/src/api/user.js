import request from '@/utils/request'

export function update(id, name, password) {
  return request.put(`/user`, { name, password, id })
}

export function getUserList() {
  return request.get(`/users`)
}
