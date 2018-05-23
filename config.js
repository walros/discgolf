require('./load.env')
const path = require('path')
const e = process.env

let missingEnvs = []

function envBool(key, notFound) {
  const value = e[key]
  if (value === 'true') return true
  if (value === 'false') return false
  if (value == null) {
    if (notFound != null) {
      return notFound
    } else {
      missingEnvs.push(key)
      return null
    }
  } else {
    throw new Error(`Boolean ${key} has non-boolean value: ${value}.`)
  }
}

function envString(key, notFound) {
  if (e[key] != null) return e[key]
  if (notFound != null) return notFound
  missingEnvs.push(key)
  return null
}

function envNum(key, notFound) {
  return parseInt(envString(key, notFound), 10)
}
const devUseWebpack = envBool('webpack_isHot', true)

const config = {
  useWebpackDevServer: devUseWebpack,
  host: envString('host', '127.0.0.1'),
  presentedHost: envString('presentedHost', 'localhost'),
  protocol: envString('protocol', 'http'),
  port: envString('port', '8000'),
  webpack: {
    host: devUseWebpack ? envString('webpack_host', 'localhost') : undefined,
    port: devUseWebpack ? envNum('webpack_port', 8888) : undefined,
    entry: path.join(__dirname, 'app', 'index.js'),
    rootDir: __dirname,
    buildDir: path.join(__dirname, 'build'),
    publicPath: envString('webpack_publicPath', '/build/'),
  },
  logger: {
    level: envString('logger_level', 'LOG'),
  },
  knex: {
    client: envString('knex_client', 'pg'),
    connection: {
      host: envString('knex_host', '127.0.0.1'),
      port: envString('knex_port', '5432'),
      user: envString('knex_user', 'postgres'),
      password: envString('knex_password', ''),
      database: envString('knex_database', 'test'),
    },
  },
}

config.logger.redux = envBool('logger_redux', config.webpack.isHot)

if (missingEnvs.length > 0) {
  console.log(missingEnvs)
  throw new Error(`Mandatory envs not specified: ${missingEnvs.join(', ')}.`)
}

module.exports = config
module.exports.default = config
