import { dirname, resolve } from 'path';
import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { createUserConfig } from '../../builder/vite';

const __dirname = dirname(new URL(import.meta.url).pathname);

export default defineConfig(({ mode }): UserConfig => {
  const projectRootPath = resolve(__dirname, '../../');
  const { ENV_TARGET, ENV_VARIANT } = loadEnv(mode, projectRootPath, 'ENV_');

  console.info({ ENV_TARGET, ENV_VARIANT });

  return createUserConfig({
    basePath: __dirname,
    port: 4001,
    define: {
      ENV: JSON.stringify({ ENV_TARGET, ENV_VARIANT }),
    },
  });
});
