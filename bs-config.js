const modRewrite = require('connect-modrewrite');
const argv = require('yargs').argv;

const https = !!argv.ssl;

module.exports = {
  files: ['dist'],
  server: {
    baseDir: ['dist'],
    middleware: [modRewrite(['!^/(assets)  /index.html'])],
  },
  https,
  port: https ? 443 : 3000,
  startPath: '/',
  reloadDelay: 500,
  reloadDebounce: 500,
};
