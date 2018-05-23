import {server, makeConfig} from 'webpack-config-vacuumlabs'
import config from '../../config'

const options = {
  ...config.webpack,
  env: 'development',
  useDevServer: true,
}

server(makeConfig(options), config.webpack, () => {
// eslint-disable-next-line no-console
  console.log('Server has started')
})
