'use strict';
const Service = require('egg').Service;

class CategoriesService extends Service {
  async create(name) {
    return await this.ctx.model.Categories.create({ name });
  }

  async find() {
    return await this.ctx.model.Categories.find({ status: { $ne: '2' } });
  }

  async findById(id) {
    return await this.ctx.model.Categories.findById(id);
  }

  async findByIdAndUpdate(_id, content) {
    return await this.ctx.model.Categories.findByIdAndUpdate({ _id, status: { $ne: '2' } }, { $set: content });
  }

  async aggregateCategories() {
    return await this.ctx.model.Categories.aggregate([
      { $match: { status: { $ne: '2' } } },
      {
        $lookup:
        {
          from: 'articles',
          localField: '_id',
          foreignField: 'category',
          as: 'articles',
        },
      },
      {
        $unwind: {
          path: '$articles',
          // preserveNullAndEmptyArrays : true // 空的数组也拆分
        },
      },
      { $match: { 'articles.status': { $ne: '2' } } },
      { $group: { _id: '$_id', name: { $first: '$name' }, total: { $sum: 1 } } },

    ]);
  }

}

module.exports = CategoriesService;
