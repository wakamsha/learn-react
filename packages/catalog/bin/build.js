import { build } from 'vite';
import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .option('-t, --target, <type>', 'target option')
  .option('-v, --variant, [variant]', 'variant option')
  .parse(process.argv);

const { target, variant } = program.opts();

(async () => {
  await build({
    define: {
      ENV: JSON.stringify({ target, ...(variant ? { variant: Number(variant) } : {}) }),
    },
  });
})();
