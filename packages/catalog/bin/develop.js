import { createServer } from 'vite';
import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .option('-t, --target, <type>', 'target option')
  .option('-v, --variant, [variant]', 'variant option')
  .parse(process.argv);

const { target, variant } = program.opts();

(async () => {
  const server = await createServer({
    define: {
      ENV: JSON.stringify({ target, ...(variant ? { variant: Number(variant) } : {}) }),
    },
  });

  await server.listen();
})();
