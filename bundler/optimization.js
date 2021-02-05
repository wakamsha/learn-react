// @ts-check
const TerserPlugin = require('terser-webpack-plugin');

/**
 * @typedef {object} Config
 * @property {string} chunkName
 *
 * @param {Config} config
 */
module.exports = function factory({ chunkName }) {
  return {
    splitChunks: {
      name: 'vendor.bundle',
      // Dynamic import に関連しない node_modules から呼び出すライブラリをひとまとめにしている
      chunks: ({ name }) => name === chunkName,
    },
    minimizer: [getExtractLicenseCommentsOption()],
  };
};

/**
 * ライセンス関係のコメントを licenses.txt へ抽出するための設定。
 * optimization.minimizer へセットする
 *
 * @see https://github.com/webpack-contrib/terser-webpack-plugin#options
 */
function getExtractLicenseCommentsOption() {
  return new TerserPlugin({
    extractComments: {
      condition: /^\**!|@preserve|@license|@cc_on/i,
      filename: 'licenses.txt',
    },
    terserOptions: {
      output: {
        // 対象とするコメントの pattern
        comments: /^\**!|@preserve|@license|@cc_on/,
      },
    },
  });
}
