import request from '@/utils/request'

export function getList() {
	return request.get('/categories')
}

export function countCategotres() {
	return request.get('/categories/count')
}
