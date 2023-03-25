import { createUserConfig } from '@learn-react/builder';
import { resolve } from 'path';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(({ mode }): UserConfig => {
  console.info({ mode });

  return createUserConfig({
    basePath: __dirname,
    alias: {
      '@learn-react/core': resolve(__dirname, '../../packages/core/src'),
      '@learn-react/icon': resolve(__dirname, '../../packages/icon/dist'),
    },
  });
});
