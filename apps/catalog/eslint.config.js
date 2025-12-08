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

  {
    files: ['**/*.tsx'],
    rules: {
      'react-hooks/refs': ['off'],
      'react-hooks/set-state-in-effect': ['off'],
    },
  },
];
