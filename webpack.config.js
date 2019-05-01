const path = require('path');
const argv = require('yargs').argv;

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const mode = !!argv.develop ? 'development' : 'production';

module.exports = {
  mode,
  entry: ['./src/scripts/index.tsx'],
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
        use: ['ts-loader'],
        exclude: [/node_modules/, nodeModulesPath],
      },
    ],
  },
};
