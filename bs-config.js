const modRewrite = require('connect-modrewrite');

module.exports = {
  files: ['dist'],
  server: {
    baseDir: ['dist'],
    middleware: [modRewrite(['!^/(assets)  /index.html'])],
  },
  https: false,
  port: 3000,
  startPath: '/',
  reloadDelay: 500,
  reloadDebounce: 500,
};
