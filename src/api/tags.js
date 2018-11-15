import _request from '@/utils/request'

export function getList () {
	return _request.get('/tags')
}

