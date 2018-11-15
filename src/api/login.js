
import _request from '@/utils/request'

export function login (name, password) {
    return _request.post('/login', {name, password})
}

export function getInfo () {
    return _request.get('/user')
}

export function logout () {
    return request({
        url : '/user/logout',
        method : 'post'
    })
}