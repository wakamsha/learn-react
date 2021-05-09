import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { defineConfig } from 'vite';

type Props = {
  basePath: string;
  port?: number;
};

export function builder({ basePath, port }: Props) {
  return defineConfig({
    plugins: [reactRefresh()],
    resolve: {
      alias: {
        '@learn-react/core': resolve(basePath, '../core/src'),
        '@learn-react/icon': resolve(basePath, '../icon/dist'),
      },
    },
    esbuild: {
      jsxInject: `import React from 'react';`,
    },
    server: {
      port,
    },
    build: {
      sourcemap: true,
    },
  });
}
