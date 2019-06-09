'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GATEWAY: '"http://120.77.219.106:7001"',
  STATIC_DOMAIN: '"http://127.0.0.1:7001"'
})
