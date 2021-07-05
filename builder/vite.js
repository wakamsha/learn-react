// @ts-check
const { createServer, build } = require('vite');
const reactRefresh = require('@vitejs/plugin-react-refresh');
const { resolve } = require('path');

/**
 * Dev サーバを立ち上げて開発用にビルドします。
 *
 * @typedef {object} Props
 * @property {string} basePath
 * @property {number} [port]
 * @property {object} [define]
 *
 * @param {Props} props
 */
module.exports.runCreateServer = ({ basePath, port = 3000, define }) =>
  createServer({
    define,
    server: {
      port,
    },
    ...createBaseConfig(basePath),
  });

/**
 * プロダクション用にビルドします。
 *
 * @typedef {object} BuildProps
 * @property {string} basePath
 * @property {object} [define]
 *
 * @param {BuildProps} props
 */
module.exports.runBuild = ({ basePath, define }) =>
  build({
    define,
    build: {
      sourcemap: true,
    },
    ...createBaseConfig(basePath),
  });

/**
 * Vite 実行関数に渡す共通設定オブジェクトを生成します。
 *
 * @param {string} basePath
 */
function createBaseConfig(basePath) {
  return {
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
  };
}
