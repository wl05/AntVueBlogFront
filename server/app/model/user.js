'use strict';
const rand = require('csprng');
const sha1 = require('sha1');
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'], // 0存在 1更新，2 删除
      default: 'male',
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      default: '',
    },
    role: {
      type: Number,
      default: 1, // 0： 普通用户，1，管理员
    },
    activated: {
      type: String,
      enum: ['0', '1'], // 0待激活 1已激活
      default: '1',
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
  const User = mongoose.model('Users', UserSchema);
  initialize(User);
  return User;
};

function initialize(User) {
  User.find({}, (err, doc) => {
    if (err) {
      this.logger(err);
      console.log('initialize failed');
    } else if (!doc.length) {
      const salt = rand(160, 36);
      new User({
        activated: 1,
        email: '2929712050@qq.com',
        name: 'admin',
        password: sha1('admin' + salt),
        salt,
      }).save();
    } else {
      console.log('initialize successfully');
    }
  });
}

