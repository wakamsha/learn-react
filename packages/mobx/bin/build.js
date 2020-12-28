const path = require('path');
const { exec } = require('../../../bin/build');

exec({
  mode: 'development',
  baseDir: __dirname,
  entryPoints: [path.resolve(__dirname, '../src/index.tsx')],
});
