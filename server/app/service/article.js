'use strict';
const Service = require('egg').Service;

class ArticleService extends Service {
  async create(content) {
    return await this.ctx.model.Article.create(content);
  }

  async count(condition) {
    return await this.ctx.model.Article.countDocuments(condition);
  }

  async findByIdAndUpdate(_id, content) {
    return await this.ctx.model.Article.updateOne({ _id, status: { $ne: '2' } }, { $set: content });
  }

  async find(params) {
    let {
      pageSize,
      pageLimit,
      publishStatus,
    } = params;
    const condition = {};
    if (publishStatus) {
      condition.publishStatus = publishStatus;
    }
    pageSize = pageSize ? Number(pageSize) : 0;
    pageLimit = pageLimit ? Number(pageLimit) : 0;
    const count = await this.count({ status: { $ne: '2' } });
    const article = await this.ctx.model.Article.find({ ...condition, status: { $ne: 2 } }, {
      markdownValue: 0,
      htmlValue: 0,
    })
      .skip((pageSize - 1) * pageLimit)
      .limit(pageLimit)
      .sort({ publishAt: -1 });
    return { count, article, pageSize, pageLimit };
  }

  async findOne(condition) {
    return await this.ctx.model.Article.findOne({
      ...condition,
      status: { $ne: '2' },
    }, {
      markdownValue: 0,
      creator: 0,
    })
      .populate('category', 'name')
      .populate('tag', 'name')
      .populate('creator', 'name');
  }

  async updateManyByTagId(id, newContent = { $set: { status: 2 } }) {
    return await this.ctx.model.Article.updateMany({ tag: id }, newContent);
  }

  async updateManyByCategoryId(id, newContent = { $set: { status: 2 } }) {
    return await this.ctx.model.Article.updateMany({ category: id }, newContent);
  }

  async findByTag(tag) {
    return await this.ctx.model.Article.find({ tag, status: { $ne: '2' } }, {
      publishAt: 1,
      title: 1,
    })
      .sort({ publishAt: -1 });
  }

  async findByCategory(category, pageSize, pageLimit) {
    pageSize = pageSize ? Number(pageSize) : 0;
    pageLimit = pageLimit ? Number(pageLimit) : 0;
    const condition = { category, status: { $ne: '2' } };
    const count = await this.count(condition);
    const article = await this.ctx.model.Article.find(condition, {
      markdownValue: 0,
      htmlValue: 0,
    })
      .skip((pageSize - 1) * pageLimit)
      .limit(pageLimit)
      .sort({ publishAt: -1 });
    return { count, article, pageSize, pageLimit };
  }

  async updateViewCount(_id) {
    return await this.ctx.model.Article.updateOne({ _id }, {
      $inc: {
        viewCount: 1,
      },
    });
  }

  async aggregateArchives() {
    return await this.ctx.model.Article.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $add: [
                  new Date(0),
                  { $multiply: [1, '$publishAt'] },
                ],
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]
    );

  }

  async findByArchive(start, end, pageSize, pageLimit) {
    pageSize = pageSize ? Number(pageSize) : 0;
    pageLimit = pageLimit ? Number(pageLimit) : 0;
    const condition = { publishAt: { $gt: start, $lt: end }, status: { $ne: '2' } };
    const count = await this.count(condition);
    const article = await this.ctx.model.Article.find(condition, {
      markdownValue: 0,
      htmlValue: 0,
    })
      .skip((pageSize - 1) * pageLimit)
      .limit(pageLimit)
      .sort({ publishAt: -1 });
    return { count, article, pageSize, pageLimit };
  }

  async findByKeywords(keywords, pageSize, pageLimit) {
    pageSize = pageSize ? Number(pageSize) : 0;
    pageLimit = pageLimit ? Number(pageLimit) : 0;
    const condition = { title: { $regex: new RegExp(keywords, 'i') }, status: { $ne: '2' } };
    const count = await this.count(condition);
    const article = await this.ctx.model.Article.find(condition, {
      markdownValue: 0,
      htmlValue: 0,
    })
      .skip((pageSize - 1) * pageLimit)
      .limit(pageLimit)
      .sort({ publishAt: -1 });
    return { count, article, pageSize, pageLimit };
  }
}


module.exports = ArticleService;
