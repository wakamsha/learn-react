import vitest from 'eslint-plugin-vitest';

export default {
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
};
