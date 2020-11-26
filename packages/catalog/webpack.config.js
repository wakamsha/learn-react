const builder = require('../../webpack');

module.exports = (_env, { mode = 'development' }) =>
  builder({
    mode,
    baseDir: __dirname,
    entry: ['./src/index.tsx'],
  });
