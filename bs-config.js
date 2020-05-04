const modRewrite = require('connect-modrewrite');
const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const { argv } = require('yargs');

const webpackConfig = require('./webpack.config');

const https = !!argv.ssl;
const bundler = webpack(webpackConfig);

module.exports = {
  files: ['dist'],
  server: {
    baseDir: ['dist'],
    middleware: [
      modRewrite(['!^/(assets)  /index.html']),
      webpackDev(bundler, {
        publicPath: webpackConfig.output.publicPath,
      }),
      webpackHot(bundler),
    ],
  },
  https,
  port: https ? 443 : 3000,
  startPath: '/',
  reloadDelay: 500,
  reloadDebounce: 500,
  reloadOnRestart: false,
};
