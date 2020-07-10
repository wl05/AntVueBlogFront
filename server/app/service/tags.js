'use strict';
const Service = require('egg').Service;
class TagsService extends Service {
  async create(name) {
    return await this.ctx.model.Tags.create({ name });
  }

  async find(condition) {
    return await this.ctx.model.Tags.find({ ...condition, status: { $ne: '2' } });
  }

  async findById(id) {
    return await this.ctx.model.Tags.findById(id);
  }

  async findByIdAndUpdate(_id, content) {
    return await this.ctx.model.Tags.findByIdAndUpdate({ _id, status: { $ne: '2' } }, { $set: content });
  }
}

module.exports = TagsService;
