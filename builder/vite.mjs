// @ts-check
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { build, createServer, splitVendorChunkPlugin } from 'vite';

/**
 * @typedef {['develop', 'build'][number]} Mode Vite の起動モードを指定します。
 * - develop: Dev サーバを起動し開発用にビルドします。
 * - build: プロダクション用にビルドします。
 *
 * @typedef {object} Options
 * @property {string} basePath
 * @property {number} [port]
 * @property {object} [define]
 *
 * @param {Mode} mode
 * @param {Options} props
 */
// eslint-disable-next-line default-param-last
export function exec(mode = 'develop', { basePath, port = 3000, define }) {
  console.info({ mode, define });

  if (mode === 'develop') {
    (async () => {
      const server = await createServer({
        define,
        server: {
          port,
          open: true,
        },
        ...createBaseConfig(basePath),
      });

      await server.listen();
    })();
  } else {
    build({
      define,
      build: {
        sourcemap: false,
      },
      ...createBaseConfig(basePath),
    });
  }
}

/**
 * Vite 実行関数に渡す共通設定オブジェクトを生成します。
 *
 * @param {string} basePath
 */
function createBaseConfig(basePath) {
  return {
    root: resolve(basePath, '../'),
    plugins: [
      splitVendorChunkPlugin(),
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@learn-react/core': resolve(basePath, '../../core/src'),
        '@learn-react/icon': resolve(basePath, '../../icon/dist'),
        '@learn-react/try': resolve(basePath, '../../try/src'),
      },
    },
  };
}
