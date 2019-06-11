import _request from '@/utils/request'

export function user (name, password) {
  return _request.post('/user', {name, password})
}

export function getInfo () {
  return _request.get('/user')
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function generateAuthCode () {
  return _request.get('/authcode')
}

export function signup (info) {
  return _request.post('/signup', info)
}

export function login (info) {
  return _request.post('/login', info)
}
