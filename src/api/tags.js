import request from '@/utils/request'

export function getList() {
	return request.get('/tags')
}

