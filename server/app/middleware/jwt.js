'use strict';
const { error_005, error_001 } = require('../common/common');

module.exports = () => {
  return async (ctx, next) => {
    const bearerToken = ctx.headers.authorization,
      token = bearerToken && bearerToken.replace('Bearer ', '');
    let userInfo = null;
    if (token) {
      try {
        userInfo = await ctx.app.redis.get(`${token}`);
        if (!userInfo) {
          ctx.body = {
            code: error_005[0],
            message: error_005[1],
          };
          ctx.status = 200;
        } else {
          userInfo = JSON.parse(userInfo);
          ctx.id = userInfo.id;
          await next();
        }
      } catch (err) {
        this.logger(err);
        ctx.body = {
          code: error_001[0],
          message: error_001[1],
        };
        ctx.status = 200;
        return;
      }

    } else {
      // 如果token为空，则代表客户没有登录
      ctx.body = {
        code: error_005[0],
        message: error_005[1],
      };
      ctx.status = 200;
    }
  };
};
