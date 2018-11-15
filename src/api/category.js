import _request from '@/utils/request'

export function getList () {
	return _request.get('/categories')
}

export function countCategotres () {
	return _request.get('/categories/count')
}
