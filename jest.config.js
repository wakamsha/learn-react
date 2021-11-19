// @ts-check
const fs = require('fs');
const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

/**
 * @typedef {object} Props
 * @property {string} basePath
 *
 * @param {Props} props
 */
module.exports.builder = ({ basePath }) => {
  const filepath = path.join(basePath, './tsconfig.json');
  const tsconfig = fs.readFileSync(filepath, 'utf8');
  const { compilerOptions } = JSON.parse(tsconfig);

  return {
    preset: 'ts-jest',
    clearMocks: true,
    testEnvironment: 'jsdom',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    globals: {
      TextEncoder,
      ENV_TYPE: 'dev',
      ENV_RELEASE: false,
    },
  };
};
