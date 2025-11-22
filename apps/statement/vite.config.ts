import { createUserConfig } from '@learn-react/builder';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(({ mode }): UserConfig => {
  console.info({ mode });

  return createUserConfig({
    basePath: import.meta.dirname,
  });
});
