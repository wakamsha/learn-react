// @ts-check
const { createServer } = require('../../../builder/vite');

(async () => {
  const server = await createServer({
    basePath: __dirname,
  });

  await server.listen();
})();
