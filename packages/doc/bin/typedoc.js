// @ts-check
import { dirname, resolve } from 'path';
import TypeDoc from 'typedoc';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __dirname = dirname(new URL(import.meta.url).pathname);

const { name, watch } = await yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    choices: ['catalog', 'core', 'routing', 'statement'],
  })
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    default: false,
  })
  .parseAsync();

console.info({ name, watch });

async function main() {
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    watch,
    entryPoints: [resolve(__dirname, `../../${name}`)],
    exclude: [resolve(__dirname, '../../**/*.(test|story).tsx')],
    tsconfig: resolve(__dirname, `../../${name}/tsconfig.json`),
    basePath: resolve(__dirname, `../${name}/src`),
    readme: resolve(__dirname, `../../${name}/README.md`),
    out: resolve(__dirname, `../dist/${name}`),
    entryPointStrategy: 'expand',
    excludeExternals: true,
    name: `@learn-react/${name}`,
    theme: 'hierarchy',
  });

  const project = app.convert();

  if (!project) return;

  await app.generateDocs(project, resolve(__dirname, `../dist/${name}`));
}

main();
