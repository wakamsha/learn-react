// @ts-check
import baseConfig from '@learn-react/linter/eslint.config';

export default [
  ...baseConfig,
  {
    ignores: ['**/Stories.ts'],
  },
  {
    files: ['**/*.config.*'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
    },
  },
];
