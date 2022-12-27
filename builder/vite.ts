import linaria from '@linaria/rollup';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { BuildOptions, UserConfig } from 'vite';
import { splitVendorChunkPlugin } from 'vite';

type Props = {
  basePath: string;
  /**
   * @default 3000
   */
  port?: number;
  /**
   * @default {}
   */
  define?: Record<string, unknown>;
  /**
   * @default {}
   */
  build?: BuildOptions;
};

export function createUserConfig({ basePath, port = 3000, define = {}, build = {} }: Props): UserConfig {
  const alias = {
    '@learn-react/core': resolve(basePath, '../core/src'),
    '@learn-react/icon': resolve(basePath, '../icon/dist'),
    '@learn-react/try': resolve(basePath, '../try/src'),
  };

  return {
    define,
    root: resolve(basePath, './'),
    build: {
      sourcemap: true,
      ...build,
    },
    server: {
      port,
      host: true,
      open: true,
    },
    resolve: {
      alias,
    },
    plugins: [
      splitVendorChunkPlugin(),
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
        },
      }),
      linaria({
        sourceMap: true,
        babelOptions: {
          plugins: [
            // linaria にエイリアスパスを認識させるための措置。
            [
              'module-resolver',
              {
                alias,
              },
            ],
          ],
          // パースエラー回避のための措置。
          // linaria でのスタイル定義内に何かしら型情報が入り込む場合はこの設定が必要となる。
          presets: ['@babel/preset-typescript'],
        },
      }),
    ],
  };
}
