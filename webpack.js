const path = require('path');

function builder({ mode = 'development', baseDir, entry }) {
  const develop = mode === 'development';

  return {
    mode,
    entry,
    output: {
      path: path.resolve(baseDir, 'dist/'),
      filename: 'app.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [path.resolve(baseDir, './src'), path.resolve(baseDir, '../../node_modules')],
      alias: {
        '@learn-react/core': path.resolve(baseDir, '../core/src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'ts-loader', options: { transpileOnly: develop } }],
        },
      ],
    },
    devtool: develop ? 'eval-cheap-module-source-map' : 'source-map',
    ...(develop
      ? {
          devServer: {
            port: 3000,
            open: true,
            hot: true,
            publicPath: '/',
            contentBase: path.join(baseDir, 'dist/'),
            historyApiFallback: {
              index: '/',
            },
          },
        }
      : {}),
  };
}

module.exports = builder;
