'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ImagesSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    publishAt: { // 发布日期
      type: Number,
      required: true,
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

  return mongoose.model('Images', ImagesSchema);
};
