// @ts-check
import jestDom from 'eslint-plugin-jest-dom';

export default {
  plugins: {
    'jest-dom': jestDom,
  },

  rules: {
    ...jestDom.configs.recommended.rules,
  },
};
