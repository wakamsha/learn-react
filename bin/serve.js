const path = require('path');
const servor = require('servor');

exports.exec = ({ baseDir, port = 3000 }) => {
  console.info(path.resolve(baseDir, '../dist'));
  servor({
    port,
    root: './dist',
    fallback: 'index.html',
    reload: true,
    inject: '',
  });
};
