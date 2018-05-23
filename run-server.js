const config = require('./config.js')
if (!config.useBabelWatch) {
  require('babel-register')
}
require('babel-polyfill')
require('./server')
