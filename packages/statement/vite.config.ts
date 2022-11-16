import { dirname } from 'path';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { createUserConfig } from '../../builder/vite';

const __dirname = dirname(new URL(import.meta.url).pathname);

export default defineConfig(({ mode }): UserConfig => {
  console.info({ mode });

  return createUserConfig({
    basePath: __dirname,
  });
});
