module.exports = {
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': ['error'],
    'react-hooks/rules-of-hooks': ['error'],
  },
  overrides: [
    {
      files: ['./**/stores/**/*.ts'],
      rules: {
        'react-hooks/rules-of-hooks': ['off'],
      },
    },
  ],
};
