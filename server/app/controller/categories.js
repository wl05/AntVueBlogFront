'use strict';
const struct = require('superstruct').struct;
const Controller = require('egg').Controller;
const { error_001, error_002 } = require('../common/common');

class Categories extends Controller {
  // create tag
  async create() {
    const { ctx, service } = this;
    const validator = struct({
      name: 'string',
    });
    try {
      validator(ctx.request.body);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      const categories = await service.categories.create(ctx.request.body.name);
      return ctx.helper.success(ctx, categories);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }


  async getCategories() {
    const { ctx, service } = this;
    try {
      const categories = await service.categories.find();
      return ctx.helper.success(ctx, categories);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async getAggregateCategories() {
    const { ctx, service } = this;
    try {
      const categories = await service.categories.aggregateCategories();
      // const categories = await service.article.aggregateCategories()
      return ctx.helper.success(ctx, categories);
    } catch (err) {
      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async findByIdAndUpdate() {
    const { ctx, service } = this;
    const validatorParams = struct({
      id: 'string',
    });
    const validatorBody = struct({
      name: 'string',
    });
    try {
      validatorParams(ctx.params);
      validatorBody(ctx.request.body);
    } catch (err) {
      return ctx.helper.error(ctx, error_002[0], error_002[1]);
    }

    try {
      const updatingContent = {
        name: ctx.request.body.name,
        updatedAt: Date.now(),
        status: '1',
      };
      const categories = await service.categories.findByIdAndUpdate(ctx.params.id, updatingContent);
      const category_detail = await service.categories.findById(ctx.params.id);
      await service.article.updateManyByCategoryId(ctx.params.id, { $set: { category_detail } });
      return ctx.helper.success(ctx, categories);
    } catch (err) {
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }

  async deleteCategory() {
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
      await service.categories.findByIdAndUpdate(ctx.params.id, updatingContent);
      await service.article.updateManyByCategoryId(ctx.params.id);
      return ctx.helper.success(ctx);
    } catch (err) {

      this.logger(err);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }
}

module.exports = Categories;

