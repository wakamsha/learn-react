// @ts-check
const path = require('path');

/**
 * @typedef {object} Config
 * @property {string} basePath
 * @property {number} port
 *
 * @param {Config} config
 */
module.exports = function factory({ basePath, port }) {
  const devServer = {
    port,
    open: true,
    hot: true,
    publicPath: '/',
    contentBase: path.join(basePath, 'dist/'),
    historyApiFallback: {
      index: '/',
    },
  };

  return devServer;
};
