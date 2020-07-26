"use strict";
exports.mongoose = {
  client: {
    // url: `mongodb://mongodb:27017/ant_blog`,
    url: `mongodb://ant:wl123456@mongodb:27017/ant_blog`, // user: 数据库的用户名 password: 密码.
    options: {},
  },
};

// config redis
exports.redis = {
  client: {
    port: 6379, // Redis port
    host: "redis", // Redis host
    password: 123456,
    db: 0,
  },
};

// exports.baseUrl = 'http://182.254.168.74:7001';
// exports.redirectActivationUrl = 'http://182.254.168.74/activation';
