import _request from '@/utils/request'

export function githubLogin(params) {
    return _request.get('/articles', params)
}