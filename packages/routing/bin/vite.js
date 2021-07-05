// @ts-check
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { runBuild, runCreateServer } = require('../../../builder/vite');

// @ts-ignore
const { build } = yargs(hideBin(process.argv)).option('build', {
  alias: 'b',
  type: 'boolean',
  describe: 'プロダクション用にビルドするかどうかを指定します。',
  default: false,
}).argv;

if (build) {
  runBuild({
    basePath: __dirname,
  });
} else {
  (async () => {
    const server = await runCreateServer({
      basePath: __dirname,
    });

    await server.listen();
  })();
}
