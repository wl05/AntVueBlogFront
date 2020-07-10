'use strict';
const Service = require('egg').Service;
class CommentService extends Service {
  async create({ article_id, commentator, content, reply_to_comment_id, reply_to_user_id }) {
    return await this.ctx.model.Comment.create({ article_id, commentator, content, reply_to_comment_id, reply_to_user_id });
  }

  async find(condition) {
    return await this.ctx.model.Comment.find({ ...condition, status: { $ne: '2' } }).populate('commentator', 'name').lean()
      .exec();
  }
}

module.exports = CommentService;
