const path = require('path');

function builder({ mode = 'development', baseDir, entry }) {
  const develop = mode === 'development';

  return {
    mode,
    entry,
    output: {
      path: path.resolve(baseDir, 'dist/'),
      filename: 'app.js',
      assetModuleFilename: 'assets/[name][ext]',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [path.resolve(baseDir, './src'), path.resolve(baseDir, '../../node_modules')],
      alias: {
        '@learn-react/core': path.resolve(baseDir, '../core/src'),
        '@learn-react/icon': path.resolve(baseDir, '../icon/dist'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'ts-loader', options: { transpileOnly: develop } }],
        },
        {
          test: /\.(ico|svg|jpe?g|png|webp|woff)$/,
          type: 'asset/resource',
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
