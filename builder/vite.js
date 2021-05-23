// @ts-check
const { createServer: createServerOrigin, build: buildOrigin } = require('vite');
const reactRefresh = require('@vitejs/plugin-react-refresh');
const { resolve } = require('path');

/**
 * @typedef {object} Props
 * @property {string} basePath
 * @property {number} [port]
 * @property {object} [define]
 *
 * @param {Props} props
 */
module.exports.createServer = ({ basePath, port = 3000, define }) =>
  createServerOrigin({
    define,
    root: resolve(basePath, '../'),
    // @ts-ignore
    plugins: [reactRefresh()],
    esbuild: {
      jsxInject: `import React from 'react';`,
    },
    resolve: {
      alias: {
        '@learn-react/core': resolve(basePath, '../../core/src'),
        '@learn-react/icon': resolve(basePath, '../../icon/dist'),
      },
    },
    server: {
      port,
    },
  });

/**
 * @typedef {object} BuildProps
 * @property {string} basePath
 * @property {object} [define]
 *
 * @param {BuildProps} props
 */
module.exports.build = ({ basePath, define }) =>
  buildOrigin({
    define,
    root: resolve(basePath, '../'),
    // @ts-ignore
    plugins: [reactRefresh()],
    esbuild: {
      jsxInject: `import React from 'react';`,
    },
    resolve: {
      alias: {
        '@learn-react/core': resolve(basePath, '../../core/src'),
        '@learn-react/icon': resolve(basePath, '../../icon/dist'),
      },
    },
    build: {
      sourcemap: true,
    },
  });
