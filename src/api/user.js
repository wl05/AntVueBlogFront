import request from '@/utils/request'

export function user(name, password) {
  return request.post('/user', { name, password })
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

export function generateAuthCode() {
  return request.get('/authcode')
}

export function signup(info) {
  return request.post('/signup', info)
}

export function login(info) {
  return request.post('/login', info)
}
