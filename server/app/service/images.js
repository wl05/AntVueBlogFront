'use strict';
const Service = require('egg').Service;

class ImgService extends Service {
  async create(data) {
    return await this.ctx.model.Images.collection.insertMany(data);
  }
}

module.exports = ImgService;
