import request from '@/utils/request'

export function login(email, password) {
  return request.post('/login', { email, password })
}

export function getInfo() {
  return request.get('/user')
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
