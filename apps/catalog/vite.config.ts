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
      // Top-level await をサポートしているブラウザを対象にする。
      // PDF.js の worker が Top-level await を使用しているため、この設定が必要。
      target: 'esnext',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          preview: resolve(__dirname, 'preview.html'),
        },
      },
    },
  });
});
