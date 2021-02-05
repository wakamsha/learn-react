// @ts-check
const path = require('path');

/**
 * import path を絶対パスで解決する。
 *
 * @typedef {object} Config
 * @property {string} basePath
 *
 * @param {Config} config
 */
module.exports = function factory({ basePath }) {
  const resolve = {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(basePath, './src'), path.resolve(basePath, '../../node_modules')],
    alias: {
      '@learn-react/core': path.resolve(basePath, '../core/src'),
      '@learn-react/icon': path.resolve(basePath, '../icon/dist'),
    },
  };

  return resolve;
};
