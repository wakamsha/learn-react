import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function getArgs(argv) {
  return yargs(hideBin(argv))
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
}
