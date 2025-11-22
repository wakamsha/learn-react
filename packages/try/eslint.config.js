// @ts-check
import baseConfig from '@learn-react/linter/eslint.config';

export default [
  ...baseConfig,

  {
    files: ['src/**/*'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-description': ['off'],
      'jsdoc/require-param-description': ['off'],
    },
  },
];
