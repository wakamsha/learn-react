// @ts-check
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { exec } = require('../../../builder/vite');

// @ts-ignore
const { mode } = yargs(hideBin(process.argv)).option('mode', {
  alias: 'm',
  choices: ['develop', 'build'],
  describe: 'develop: 開発用ビルド, build: プロダクション用ビルド',
  default: 'develop',
}).argv;

exec(mode, { basePath: __dirname });
