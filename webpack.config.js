const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');

const mode = !!argv.develop ? 'development' : 'production';
const polyfill = !!argv.polyfill;

const babelLoaderOption = {
  loader: 'babel-loader',
  options: {
    presets: [['@babel/preset-env']],
  },
};

console.log(`Polyfill: ${polyfill}`);

module.exports = {
  mode,
  entry: [
    ...(polyfill ? ['whatwg-fetch', 'url-search-params-polyfill'] : []),
    '@babel/polyfill',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/scripts/index.tsx',
  ],
  output: {
    path: path.resolve('dist/assets/'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },
  plugins: [
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['react-hot-loader/webpack', babelLoaderOption, 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['react-hot-loader/webpack', babelLoaderOption],
        exclude: /node_modules/,
      },
    ],
  },
};
