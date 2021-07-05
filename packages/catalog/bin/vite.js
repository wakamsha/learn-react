// @ts-check
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { exec } = require('../../../builder/vite');

// @ts-ignore
const { mode, target, variant } = yargs(hideBin(process.argv))
  .option('mode', {
    alias: 'm',
    choices: ['develop', 'build'],
    describe: 'develop: 開発用ビルド, build: プロダクション用ビルド',
    default: 'develop',
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

exec(mode, {
  basePath: __dirname,
  define: {
    ENV: JSON.stringify({ target, ...(variant ? { variant } : {}) }),
  },
  port: 4001,
});
