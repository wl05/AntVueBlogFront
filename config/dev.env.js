'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GATEWAY: '"http://localhost:7001"',
  STATIC_DOMAIN: '"http://localhost:7001"'
})
