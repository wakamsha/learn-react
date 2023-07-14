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

/**
 * Vite に渡す設定のうち共通部分を生成します。
 */
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
    ],
  };
}
