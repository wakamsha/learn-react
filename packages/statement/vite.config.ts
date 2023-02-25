import { defineConfig, type UserConfig } from 'vite';
import { createUserConfig } from '../../builder/vite';

export default defineConfig(({ mode }): UserConfig => {
  console.info({ mode });

  return createUserConfig({
    basePath: __dirname,
  });
});
