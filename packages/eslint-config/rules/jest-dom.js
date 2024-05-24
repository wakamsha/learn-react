import { defineFlatConfig } from 'eslint-define-config';
import jestDom from 'eslint-plugin-jest-dom';

export default defineFlatConfig({
  plugins: {
    'jest-dom': jestDom,
  },

  rules: {
    ...jestDom.configs.recommended.rules,
  },
});
