module.exports = {
  overrides: [
    {
      files: ['*.test.*'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/valid-title': [
          'error',
          {
            ignoreTypeOfDescribeName: true,
          },
        ],
      },
    },
  ],
};
