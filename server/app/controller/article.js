'use strict';
const struct = require('superstruct').struct;
const Controller = require('egg').Controller;
const { error_001, error_002 } = require('../common/common');

class Article extends Controller {
  // create tag
  async create() {
    const { ctx, service } = this;
    const validator = struct({
      title: 'string',
      tag: 'string',
      markdownValue: 'string?',
      htmlValue: 'string?',
      publishAt: 'number',
      category: 'string',
      publishStatus: struct.enum(['1', '2']),
    });
    try {
      validator(ctx.request.body);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      const content = ctx.request.body;
      content.creator = ctx.id;
      const tag_detail = await service.tags.findById(content.tag);
      const category_detail = await service.categories.findById(content.category);
      content.tag_detail = tag_detail;
      content.category_detail = category_detail;
      const article = await service.article.create(content);
      return ctx.helper.success(ctx, article);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async getArticle() {
    const { ctx, service } = this;
    const validator = struct({
      _id: 'string',
    });

    try {
      validator(ctx.params);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      await service.article.updateViewCount(this.ctx.params._id);
      const article = await service.article.findOne(this.ctx.params);
      return ctx.helper.success(ctx, article);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async getArticles() {
    const { ctx, service } = this;
    const validator = struct({
      pageSize: 'string?',
      pageLimit: 'string?',
      publishStatus: 'string?',
    });
    try {
      validator(ctx.request.query);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      const article = await service.article.find(ctx.request.query);
      for (const val of article.article) {
        const tag_detail = await service.tags.findById(val.tag);
        const category_detail = await service.categories.findById(val.category);
        await service.article.findByIdAndUpdate(val._id, { tag_detail, category_detail });
      }
      return ctx.helper.success(ctx, article);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async findByIdAndUpdate() {
    const { ctx, service } = this;
    const validatorParams = struct({
      _id: 'string',
    });
    const validatorBody = struct({
      title: 'string?',
      tag: 'string?',
      markdownValue: 'string?',
      htmlValue: 'string?',
      publishAt: 'number?',
      publishStatus: struct.enum(['1', '2']),
      category: 'string',
    });
    try {
      validatorParams(ctx.params);
      validatorBody(ctx.request.body);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }
    try {
      const updatingContent = {
        ...ctx.request.body,
        updatedAt: Date.now(),
        status: '1',
      };
      let tag_detail = null,
        category_detail = null;
      if (ctx.request.body.tag) {
        tag_detail = await service.tags.findById(ctx.request.body.tag);
        if (!tag_detail) {
          throw new Error('Not found tag');
        }
        updatingContent.tag_detail = tag_detail;
      }
      if (ctx.request.body.category) {
        category_detail = await service.categories.findById(ctx.request.body.category);
        if (!tag_detail) {
          throw new Error('Not found category');
        }
        updatingContent.category_detail = category_detail;
      }
      const article = await service.article.findByIdAndUpdate(ctx.params._id, updatingContent);
      return ctx.helper.success(ctx, article);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async deleteArticle() {
    const { ctx, service } = this;
    const validator = struct({
      id: 'string',
    });
    try {
      validator(ctx.params);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      const updatingContent = {
        deletedAt: Date.now(),
        status: '2',
      };
      const article = await service.article.findByIdAndUpdate(ctx.params.id, updatingContent);

      return ctx.helper.success(ctx, article);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async findByTag() {
    const { ctx, service } = this;
    const validatorParams = struct({
      tag: 'string',
    });
    try {
      validatorParams(ctx.params);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }
    try {
      const article = await service.article.findByTag(ctx.params.tag);
      return ctx.helper.success(ctx, article);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async findByCategory() {
    const { ctx, service } = this;
    const validatorParams = struct({
      category: 'string',
    });
    const validatorQuery = struct({
      pageSize: 'string?',
      pageLimit: 'string?',
    });
    try {
      validatorParams(ctx.params);
      validatorQuery(ctx.query);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }
    try {
      const article = await service.article.findByCategory(ctx.params.category, ctx.query.pageSize, ctx.query.pageLimit);
      return ctx.helper.success(ctx, article);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async archives() {
    const { ctx, service } = this;
    try {
      const _archives = await service.article.aggregateArchives();
      return ctx.helper.success(ctx, _archives);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async findByArchive() {
    const { ctx, service } = this;
    const validatorParams = struct({
      timeline: 'string',
    });
    const validatorQuery = struct({
      pageSize: 'string?',
      pageLimit: 'string?',
    });
    try {
      validatorParams(ctx.params);
      validatorQuery(ctx.query);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }
    const date = (new Date(ctx.params.timeline));
    if (typeof date.getTime() !== 'number') {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }
    const start = date.getTime(),
      month = date.getMonth() === 11 ? 1 : date.getMonth() + 2,
      year = date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear(),
      endTimeline = `${year}-${month}`,
      end = (new Date(endTimeline)).getTime();
    try {
      const _archives = await service.article.findByArchive(start, end, ctx.query.pageSize, ctx.query.pageLimit);
      return ctx.helper.success(ctx, _archives);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async findByKeyWords() {
    const { ctx, service } = this;
    const validatorQuery = struct({
      pageSize: 'string?',
      pageLimit: 'string?',
      keywords: 'string',
    });
    try {
      validatorQuery(ctx.query);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }
    try {
      const article = await service.article.findByKeywords(ctx.query.keywords.trim(), ctx.query.pageSize, ctx.query.pageLimit);
      return ctx.helper.success(ctx, article);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }
}

module.exports = Article;

