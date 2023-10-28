// @ts-check
import jest from 'eslint-plugin-jest';

export default {
  plugins: {
    jest,
  },

  rules: {
    ...jest.configs.recommended.rules,

    'jest/valid-title': [
      'error',
      {
        ignoreTypeOfDescribeName: true,
      },
    ],
  },
};
