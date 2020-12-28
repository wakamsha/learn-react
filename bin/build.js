const path = require('path');
const chokidar = require('chokidar');
const esbuild = require('esbuild');

const configBase = {
  bundle: true,
  target: ['es2020'],
  format: 'esm',
  charset: 'utf8',
};

exports.exec = ({ mode, baseDir, entryPoints }) => {
  const config = {
    ...configBase,
    entryPoints,
    inject: [path.resolve(baseDir, '../../../bin/shims/import.js')],
    outfile: path.resolve(baseDir, '../dist/app.js'),
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };

  switch (mode) {
    case 'development':
      chokidar.watch(path.resolve(baseDir, '../src/**/*.{ts,tsx}')).on('all', () => {
        esbuild.buildSync({
          ...config,
          bundle: true,
        });
      });
      break;
    case 'production':
      esbuild.buildSync({
        ...config,
        minify: true,
      });
      break;
    default:
      throw new Error('mode 引数には dev, prod のどちらかを指定してください。');
  }
};
