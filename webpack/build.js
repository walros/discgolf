import {makeConfig, build} from 'webpack-config-vacuumlabs'
import config from '../config'

const options = {
  ...config.webpack,
  useDevServer: false,
  env: 'production',
}


build(makeConfig(options), () => {
  // eslint-disable-next-line no-console
  console.log('Build has finished.')
})
