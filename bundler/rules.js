// @ts-check

/**
 * @typedef {object} Config
 * @property {boolean} develop
 *
 * @param {Config} config
 */
module.exports = function factory({ develop = true }) {
  const script = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{ loader: 'ts-loader', options: { transpileOnly: develop } }],
  };

  const file = {
    test: /\.(ico|svg|jpe?g|png|webp|woff)$/,
    type: 'asset/resource',
  };

  return {
    script,
    file,
  };
};
