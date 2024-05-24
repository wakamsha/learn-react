import { defineFlatConfig } from 'eslint-define-config';
import vitest from 'eslint-plugin-vitest';

export default defineFlatConfig({
  plugins: {
    vitest,
  },

  rules: {
    ...vitest.configs.recommended.rules,

    'vitest/no-duplicate-hooks': ['error'],
    'vitest/valid-title': [
      'error',
      {
        ignoreTypeOfDescribeName: true,
      },
    ],
  },
});
