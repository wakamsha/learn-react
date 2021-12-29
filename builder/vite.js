// @ts-check
const { createServer, build } = require('vite');
const react = require('@vitejs/plugin-react');
const { resolve } = require('path');

/**
 * @typedef {['develop', 'build'][number]} Mode Vite の起動モードを指定します。
 * - develop: Dev サーバを起動し開発用にビルドします。
 * - build: プロダクション用にビルドします。
 *
 * @typedef {object} Props
 * @property {string} basePath
 * @property {number} [port]
 * @property {object} [define]
 *
 * @param {Mode} mode
 * @param {Props} props
 */
module.exports.exec = (mode = 'develop', { basePath, port = 3000, define }) => {
  console.info({ mode, define });

  if (mode === 'develop') {
    (async () => {
      const server = await createServer({
        define,
        server: {
          port,
        },
        ...createBaseConfig(basePath),
      });

      await server.listen();
    })();
  } else {
    build({
      define,
      build: {
        sourcemap: true,
      },
      ...createBaseConfig(basePath),
    });
  }
};

/**
 * Vite 実行関数に渡す共通設定オブジェクトを生成します。
 *
 * @param {string} basePath
 */
function createBaseConfig(basePath) {
  return {
    root: resolve(basePath, '../'),
    // @ts-ignore
    plugins: [react()],
    resolve: {
      alias: {
        '@learn-react/core': resolve(basePath, '../../core/src'),
        '@learn-react/icon': resolve(basePath, '../../icon/dist'),
      },
    },
  };
}
