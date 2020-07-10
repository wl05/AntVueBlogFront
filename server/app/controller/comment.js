'use strict';
const struct = require('superstruct').struct;
const Controller = require('egg').Controller;
const { error_001, error_002 } = require('../common/common');

class Comment extends Controller {
  // post comment
  async create() {
    const { ctx, service } = this;
    const validator = struct({
      article_id: 'string',
      commentator: 'string',
      content: 'string',
      reply_to_comment_id: 'string?',
      reply_to_user_id: 'string?',
    });
    const params = { ...ctx.request.body, commentator: ctx.id };
    try {
      validator(params);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      await service.comment.create(params);
      return ctx.helper.success(ctx);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async getCommentByArticleId() {
    const { ctx, service } = this;
    const validator = struct({
      article_id: 'string',
    });

    try {
      validator(ctx.params);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      const res = await service.comment.find(ctx.params);
      const subComments = [];
      for (const val of res) {
        if (val.reply_to_comment_id) {
          const cur = res.find(item => {
            return JSON.stringify(item._id) === JSON.stringify(val.reply_to_comment_id);
          });
          cur.sub_comments = cur.sub_comments || [];
          const user = await service.user.findById(val.reply_to_user_id);
          val.reply_to_user = user;
          cur.sub_comments.push(val);
          subComments.push(val);
        }
      }
      for (const val of subComments) {
        const index = res.findIndex(item => {
          return JSON.stringify(item._id) === JSON.stringify(val._id);
        });
        res.splice(index, 1);
      }
      return ctx.helper.success(ctx, res);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }
}

module.exports = Comment;

