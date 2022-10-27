// @ts-check
import { dirname } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { exec } from '../../../builder/vite.js';

const __dirname = dirname(new URL(import.meta.url).pathname);

// @ts-ignore
const { mode } = await yargs(hideBin(process.argv))
  .option('mode', {
    alias: 'm',
    choices: ['develop', 'build'],
    describe: 'develop: 開発用ビルド, build: プロダクション用ビルド',
    default: 'develop',
  })
  .parseAsync();

// @ts-ignore
exec(mode, { basePath: __dirname });
