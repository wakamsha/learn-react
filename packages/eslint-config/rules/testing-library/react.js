// @ts-check
import { defineFlatConfig } from 'eslint-define-config';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineFlatConfig({
  plugins: {
    'testing-library': testingLibrary,
  },

  rules: {
    ...testingLibrary.configs.react.rules,
  },
});
