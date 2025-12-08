// @ts-check
import baseConfig from '@learn-react/linter/eslint.config';

export default [
  ...baseConfig,

  {
    files: ['**/*.tsx'],
    rules: {
      'react-hooks/set-state-in-effect': ['off'],
    },
  },
];
