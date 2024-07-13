// @ts-check
import { dirname, resolve } from 'path';
import TypeDoc, { Application } from 'typedoc';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __dirname = dirname(new URL(import.meta.url).pathname);

const { name, watch } = await yargs(hideBin(process.argv))
  .option('name', {
    alias: 'n',
    choices: ['catalog', 'routing', 'statement', 'core'],
  })
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    default: false,
  })
  .parseAsync();

const workspace = name === 'core' ? 'packages' : 'apps';

console.info({ name, watch });

async function main() {
  const app = await Application.bootstrap({
    watch,
    entryPoints: [resolve(__dirname, `../../../${workspace}/${name}`)],
    exclude: [resolve(__dirname, '../../**/*.(test|story).tsx')],
    tsconfig: resolve(__dirname, `../../../${workspace}/${name}/tsconfig.json`),
    basePath: resolve(__dirname, `../../../${workspace}/${name}/src`),
    readme: resolve(__dirname, `../../../${workspace}/${name}/README.md`),
    out: resolve(__dirname, `../dist/${name}`),
    entryPointStrategy: 'expand',
    excludeExternals: true,
    name: `@learn-react/${name}`,
  });

  app.options.addReader(new TypeDoc.TSConfigReader());

  const project = await app.convert();

  if (!project) return;

  await app.generateDocs(project, resolve(__dirname, `../dist/${name}`));
}

main();
