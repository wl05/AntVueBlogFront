import _request from '@/utils/request'

export function githubLogin() {
    return _request.get('/github/login')
}