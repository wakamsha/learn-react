// @ts-check
const { readFileSync } = require('fs');
const { join } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');

/**
 * @typedef {object} Props
 * @property {string} basePath
 *
 * @param {Props} props
 */
module.exports.builder = ({ basePath }) => {
  const filepath = join(basePath, './tsconfig.json');
  const tsconfig = readFileSync(filepath, 'utf8');
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
      'ts-jest': {
        // Unit Test のパフォーマンス向上のための施策。
        // これを指定しておくことで Jest 実行時に TypeScript の型チェックがスキップされる。
        // 詳細: https://huafu.github.io/ts-jest/user/config/isolatedModules
        isolatedModules: true,
      },
    },
  };
};
