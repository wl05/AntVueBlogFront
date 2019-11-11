'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GATEWAY: '"http://182.254.168.74:7001"',
  STATIC_DOMAIN: '"http://182.254.168.74:7001"'
})
