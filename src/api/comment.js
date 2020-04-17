import request from '@/utils/request'
/**
 * 发表评论
 * @param {*} param0 
 */
export function postComment({ article_id, content, reply_to_comment_id, reply_to_user_id }) {
    return request.post('/comment', { article_id, content, reply_to_comment_id, reply_to_user_id })
}
export function getCommentByArticleId(article_id) {
    return request.get(`/comment/${article_id}`)
}