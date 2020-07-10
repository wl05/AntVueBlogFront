'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540997103739_7974';
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };

  // add your config here
  config.middleware = [];
  // jwt
  config.jwt = {
    secret: 'my.secret.my.secret.my.secret.my.secret',
  };
  // config cors
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
    domainWhiteList: ['*'],
  };
  // config cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // config session
  config.session = {
    key: 'SESSION_ID', // key名字
    maxAge: 1000 * 60 * 24,
    httpOnly: true,
    encrypt: true, // 加密
    renew: true, // 最大时间范围内，刷新，自动增加最大时间
  };
  return config;
};
