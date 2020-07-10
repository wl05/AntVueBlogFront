'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: Schema.ObjectId,
      ref: 'Tags',
      required: true,
    },
    tag_detail: {
      type: Object,
      required: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: 'Categories',
      required: true,
    },
    category_detail: {
      type: Object,
      required: true,
    },
    creator: {
      type: Schema.ObjectId,
      ref: 'Users',
      required: true,
    },
    htmlValue: {
      type: String,
    },
    markdownValue: {
      type: String,
    },
    publishAt: { // 发布日期
      type: Number,
      required: true,
    },
    publishStatus: {
      type: String,
      default: '1',
      enum: ['1', '2'], // '1'表示草稿，'2'表示发布
    },
    viewCount: {
      type: Number,
      default: 0,
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

  return mongoose.model('Article', ArticleSchema);
};
