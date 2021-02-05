// @ts-check
const path = require('path');
const devServerFactory = require('./devServer');
const optimizationFactory = require('./optimization');
const resolveFactory = require('./resolve');
const rulesFactory = require('./rules');

/**
 * @typedef {import('webpack').Configuration} Configuration
 *
 * @typedef {object} AppConfig
 * @property {Configuration['mode']} [mode]
 * @property {Configuration['entry']} entry
 * @property {string} basePath
 * @property {string} [chunkName]
 * @property {number} [port]
 *
 * @param {AppConfig} appConfig
 */
module.exports = function builder({ mode = 'development', basePath, entry, chunkName = 'app', port = 3000 }) {
  const develop = mode === 'development';

  const resolve = resolveFactory({ basePath });

  const rules = rulesFactory({ develop });

  const optimization = optimizationFactory({ chunkName });

  const devServer = devServerFactory({ basePath, port });

  return {
    mode,
    entry,
    resolve,
    optimization,
    output: {
      path: path.resolve(basePath, 'dist/'),
      filename: '[name].js',
      assetModuleFilename: 'assets/[name][ext]',
    },
    module: {
      rules: Object.values(rules),
    },
    devtool: develop ? 'eval-cheap-module-source-map' : 'source-map',
    ...(develop ? { devServer } : {}),
  };
};
