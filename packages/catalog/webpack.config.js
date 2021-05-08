// @ts-check
const { resolve } = require('path');
const builder = require('../../bundler/webpack');

const chunkName = 'app';

/**
 * @typedef {import('webpack').Configuration} Configuration
 *
 * @typedef {object} Config
 * @property {Configuration['mode']} mode
 *
 * @param {*} _env
 * @param {Config} config
 */
module.exports = (_env, { mode = 'development' }) =>
  builder({
    mode,
    chunkName,
    basePath: __dirname,
    entry: {
      [chunkName]: ['./src/index.tsx'],
      'pdf.worker': resolve(__dirname, '../../node_modules/pdfjs-dist/build/pdf.worker.min.js'),
    },
    port: 4001,
  });
