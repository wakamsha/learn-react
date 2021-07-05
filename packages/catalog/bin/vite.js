// @ts-check
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { runBuild, runCreateServer } = require('../../../builder/vite');

// @ts-ignore
const { build, target, variant } = yargs(hideBin(process.argv))
  .option('build', {
    alias: 'b',
    type: 'boolean',
    describe: 'プロダクション用にビルドするかどうかを指定します。',
    default: false,
  })
  .option('target', {
    alias: 't',
    choices: ['dev', 'stg', 'prod'],
    describe: '疎通する API サーバタイプを指定します。',
  })
  .option('variant', {
    alias: 'v',
    type: 'number',
    describe: 'specify PR number',
  }).argv;

const define = {
  ENV: JSON.stringify({ target, ...(variant ? { variant: Number(variant) } : {}) }),
};

if (build) {
  runBuild({
    define,
    basePath: __dirname,
  });
} else {
  (async () => {
    const server = await runCreateServer({
      define,
      basePath: __dirname,
      port: 4001,
    });

    await server.listen();
  })();
}
