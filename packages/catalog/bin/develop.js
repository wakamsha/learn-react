import { createServer } from 'vite';
import { resolve, dirname as _dirname } from 'path';
import { getArgs } from './args.mjs';

const dirname = _dirname(new URL(import.meta.url).pathname);

const { target, variant } = getArgs(process.argv);

(async () => {
  const server = await createServer({
    configFile: resolve(dirname, '../vite.config.ts'),
    define: {
      ENV: JSON.stringify({ target, ...(variant ? { variant: Number(variant) } : {}) }),
    },
  });

  await server.listen();
})();
