// @ts-check
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

module.exports.getArgs = argv =>
  yargs(hideBin(argv))
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
