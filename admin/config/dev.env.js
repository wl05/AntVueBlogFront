'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV : '"development"',
    GATEWAY : '"http://127.0.0.1:7001"',
    STATIC_DOMAIN : '"http://127.0.0.:7001"'
})
