// @ts-check
import baseConfig from '@learn-react/linter/eslint.config';

export default [
  ...baseConfig,

  {
    rules: {
      'jsdoc/require-jsdoc': ['off'],
    },
  },

  {
    files: ['**/*.tsx'],
    rules: {
      'react-hooks/refs': ['off'],
    },
  },
];
