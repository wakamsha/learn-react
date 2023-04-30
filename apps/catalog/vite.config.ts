import { createUserConfig } from '@learn-react/builder';
import { resolve } from 'path';
import { defineConfig, loadEnv, type UserConfig } from 'vite';

export default defineConfig(({ mode }): UserConfig => {
  const projectRootPath = resolve(__dirname, '../../');
  const { ENV_TARGET, ENV_VARIANT } = loadEnv(mode, projectRootPath, 'ENV_');

  console.info({ ENV_TARGET, ENV_VARIANT });

  return createUserConfig({
    basePath: __dirname,
    port: 3010,
    define: {
      ENV: JSON.stringify({ ENV_TARGET, ENV_VARIANT }),
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          preview: resolve(__dirname, 'preview.html'),
        },
      },
    },
  });
});
