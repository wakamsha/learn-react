import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
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
};

export function createUserConfig({ basePath, port = 3000, define = {} }: Props): UserConfig {
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
    },
    server: {
      port,
      host: 'localhost',
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
