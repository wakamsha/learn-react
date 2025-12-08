// @ts-check
import baseConfig from '@learn-react/linter/eslint.config';

export default [
  ...baseConfig,

  {
    files: ['**/*.story.tsx'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-description': ['off'],
      'jsdoc/require-param-description': ['off'],
    },
  },

  {
    files: ['**/*.tsx'],
    rules: {
      'react-hooks/immutability': ['off'],
      'react-hooks/refs': ['off'],
      'react-hooks/set-state-in-effect': ['off'],
    },
  },
];
