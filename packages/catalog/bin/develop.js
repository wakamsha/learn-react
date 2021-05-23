// @ts-check
const { getArgs } = require('./args');
const { createServer } = require('../../../builder/vite');

// @ts-ignore
const { target, variant } = getArgs(process.argv);

(async () => {
  const server = await createServer({
    basePath: __dirname,
    port: 4001,
    define: {
      ENV: JSON.stringify({ target, ...(variant ? { variant: Number(variant) } : {}) }),
    },
  });

  await server.listen();
})();
