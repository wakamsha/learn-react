// @ts-check
import baseConfig from '@learn-react/linter/eslint.config';

export default [
  ...baseConfig,
  {
    ignores: ['.react-router/*'],
  },
];
