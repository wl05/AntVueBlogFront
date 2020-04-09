import request from '@/utils/request'

export function githubLogin() {
    return request.get('/github/user')
}
export function getUserInfo(code) {
    return request.get('/github/user', { code })
}
