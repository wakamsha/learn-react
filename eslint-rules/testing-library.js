// @ts-check
import testingLibrary from 'eslint-plugin-testing-library';

export default {
  plugins: {
    'testing-library': testingLibrary,
  },

  rules: {
    ...testingLibrary.configs.react.rules,
  },
};
