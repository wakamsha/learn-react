import linaria from '@linaria/vite';
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
  /**
   * @default {}
   */
  alias?: Record<string, string>;
};

export function createUserConfig({ basePath, port = 3000, define = {}, build = {}, alias = {} }: Props): UserConfig {
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
          // linaria のスタイル定義内で外部ファイルから import した値が型情報ついてるとパースエラーになるので追加
          presets: ['@babel/preset-typescript'],
        },
      }),
    ],
  };
}
