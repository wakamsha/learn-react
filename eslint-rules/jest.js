// @ts-check
import jest from 'eslint-plugin-jest';

export default {
  plugins: {
    jest,
  },

  rules: {
    ...jest.configs['flat/recommended'].rules,
    ...jest.configs['flat/style'].rules,

    'jest/no-duplicate-hooks': ['error'],
    'jest/valid-title': [
      'error',
      {
        ignoreTypeOfDescribeName: true,
      },
    ],
  },
};
