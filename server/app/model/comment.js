'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CommentSchema = new Schema({
    article_id: { // 文档id
      type: String,
      required: true,
    },
    commentator: { // 评论人id
      type: Schema.ObjectId,
      ref: 'Users',
      required: true,
    },
    content: { // 回复的内容
      type: String,
      required: true,
    },
    reply_to_comment_id: { // 标识回复的哪一条评论
      type: Schema.ObjectId,
    },
    reply_to_user_id: { // 标识回复的哪一个人
      type: Schema.ObjectId,
      ref: 'Users',
    },
    createAt: {
      type: Number,
      default: Date.now,
    },
    updatedAt: {
      type: Number,
    },
    deletedAt: {
      type: Number,
    },
    status: { // 状态
      type: String,
      enum: ['0', '1', '2'], // 0存在 1更新，2 删除
      default: '0',
    },
  }, { versionKey: false });

  return mongoose.model('Comments', CommentSchema);
};
