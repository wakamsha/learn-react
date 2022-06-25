// @ts-check
import { dirname, resolve } from 'path';
import TypeDoc from 'typedoc';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __dirname = dirname(new URL(import.meta.url).pathname);

// @ts-ignore
const { name, watch } = yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    choices: ['catalog', 'core', 'mobx'],
  })
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    default: false,
  }).argv;

console.info({ name, watch });

async function main() {
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    watch,
    entryPoints: [resolve(__dirname, `../../${name}`)],
    entryPointStrategy: 'expand',
    exclude: [resolve(__dirname, '../../**/*.(test|story).tsx')],
    tsconfig: resolve(__dirname, `../../${name}/tsconfig.json`),
    readme: resolve(__dirname, `../../${name}/README.md`),
    out: resolve(__dirname, `../dist/${name}`),
    name: `@lf-webapp-frontend/${name}`,
    theme: 'hierarchy',
  });

  const project = app.convert();

  if (!project) return;

  await app.generateDocs(project, resolve(__dirname, `../dist/${name}`));
}

main();
