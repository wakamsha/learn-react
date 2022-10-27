// @ts-check
import { dirname } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { exec } from '../../../builder/vite.js';

const __dirname = dirname(new URL(import.meta.url).pathname);

const { mode, target, variant } = await yargs(hideBin(process.argv))
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
  })
  .parseAsync();

// @ts-ignore
exec(mode, {
  basePath: __dirname,
  define: {
    ENV: JSON.stringify({ target, ...(variant ? { variant } : {}) }),
  },
  port: 4001,
});
