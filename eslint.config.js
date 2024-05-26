// @ts-check
import essentials from '@wakamsha/eslint-config/essentials';
import jsdoc from '@wakamsha/eslint-config/jsdoc';
import react from '@wakamsha/eslint-config/react';
import testReact from '@wakamsha/eslint-config/test/react';
import typescript from '@wakamsha/eslint-config/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

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

  ...testReact,

  /* prettier */
  eslintConfigPrettier,
];
