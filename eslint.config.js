// @ts-check
import essentials from '@wakamsha/eslint-config/essentials';
import jsdoc from '@wakamsha/eslint-config/jsdoc';
import react from '@wakamsha/eslint-config/react';
import typescript from '@wakamsha/eslint-config/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import jestDomConfig from './eslint-rules/jest-dom.js';
import testingLibraryConfig from './eslint-rules/testing-library.js';
import vitestConfig from './eslint-rules/vitest.js';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/vitest.setup.*',
      '**/*.config.*',
      'eslint-rules/*',
      '**/bin/*',
      '**/catalog/templates/*',
    ],
  },

  ...essentials,

  ...typescript,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // React.Suspense で throw するため無効化する。
      '@typescript-eslint/no-throw-literal': ['off'],
    },
  },

  ...react,
  {
    rules: {
      'jsx-a11y/no-autofocus': ['off'],
    },
  },

  ...jsdoc,
  {
    files: ['apps/{routing,statement}/**/*', 'packages/try/**/*', '**/*.story.tsx'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-description': ['off'],
      'jsdoc/require-param-description': ['off'],
    },
  },

  /* vitest */
  {
    files: ['**/*.test.*', '**/*.test.tsx'],
    ...vitestConfig,
  },

  /* jest-dom */
  {
    files: ['**/*.test.*', '**/*.test.tsx'],
    ...jestDomConfig,
  },

  /* testing-library */
  {
    files: ['**/*.test.*', '**/*.test.tsx'],
    ...testingLibraryConfig,
  },

  /* prettier */
  eslintConfigPrettier,
];
