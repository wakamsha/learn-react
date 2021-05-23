// @ts-check
const { createServer } = require('../../../builder/vite');

(async () => {
  const server = await createServer({
    basePath: __dirname,
    port: 3001,
  });

  await server.listen();
})();
