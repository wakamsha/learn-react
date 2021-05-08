import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { defineConfig } from 'vite';

type Props = {
  basePath: string;
  port?: number;
};

// type Env = {
//   target?: 'dev' | 'stg' | 'prod';
//   variant?: number;
// };

// const { target = 'dev', variant } = yargs.argv as Env;

export function builder({ basePath, port }: Props) {
  return defineConfig({
    plugins: [reactRefresh()],
    // define: {
    //   ENV: JSON.stringify({ target }),
    // },
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
