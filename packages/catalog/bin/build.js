// @ts-check
const { getArgs } = require('./args');
const { build } = require('../../../builder/vite');

// @ts-ignore
const { target, variant } = getArgs(process.argv);

build({
  basePath: __dirname,
  define: {
    ENV: JSON.stringify({ target, ...(variant ? { variant: Number(variant) } : {}) }),
  },
});
