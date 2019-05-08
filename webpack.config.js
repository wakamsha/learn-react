const path = require('path');
const argv = require('yargs').argv;

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
  entry: [...(polyfill ? ['@babel/polyfill', 'whatwg-fetch'] : []), './src/scripts/index.tsx'],
  output: {
    path: path.resolve('dist/assets/'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [babelLoaderOption, 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [babelLoaderOption],
        exclude: /node_modules/,
      },
    ],
  },
};
