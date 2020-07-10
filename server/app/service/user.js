'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async create(info) {
    return await this.ctx.model.User.create(info);
  }

  async findOne(condition) {
    return await this.ctx.model.User.findOne(condition, {
      password: 0,
      salt: 0,
      activated: 0,
    });
  }

  async findDetail(condition) {
    return await this.ctx.model.User.findOne(condition);
  }

  async findById(_id) {
    return await this.ctx.model.User.findById({ _id }, {
      password: 0,
      salt: 0,
      activated: 0,
    });
  }

  async find() {
    return await this.ctx.model.User.find({}, {
      password: 0,
      salt: 0,
      activated: 0,
    });
  }

  async updateById(_id, data) {
    return await this.ctx.model.User.updateOne({ _id }, { $set: data });
  }
}


module.exports = UserService;
