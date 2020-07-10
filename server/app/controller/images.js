'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const { error_001 } = require('../common/common');
class ImagesController extends Controller {
  async upload() {
    const { ctx, service } = this;
    const parts = ctx.multipart({ autoFields: true });
    const files = [];
    try {
      let stream;
      while ((stream = await parts()) != null) {
        const filename = stream.filename.toLowerCase();
        const timestamp = Date.now();
        const target = path.join(this.config.baseDir, 'app/public/img', `${timestamp}_${filename}`);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        files.push({ name: filename, url: `/public/img/${timestamp}_${filename}` });
      }
      const _files = await service.images.create(files);
      return ctx.helper.success(ctx, { files: _files });
    } catch (e) {
      console.log(e);
      return ctx.helper.error(ctx, error_001[0], error_001[1]);
    }
  }
}

module.exports = ImagesController;
