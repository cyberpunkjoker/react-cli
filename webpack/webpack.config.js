const dev = require('./webpack.dev.conf')
const prod = require('./webpack.prod.conf')
const common = require('./webpack.base.conf')
const { merge } = require('webpack-merge')

const { isDev } = require('./getBaseInfo')

console.log('isDev-----------', isDev);
const config = isDev ? merge(common, dev) : merge(common, prod)

module.exports = config || {}
