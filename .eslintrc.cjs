module.exports = {
  extends: [
    'airbnb-base',
    './eslint-rules/best-practices.cjs',
    './eslint-rules/errors.cjs',
    './eslint-rules/es6.cjs',
    './eslint-rules/imports.cjs',
    './eslint-rules/style.cjs',
    './eslint-rules/jsx-a11y.cjs',
    './eslint-rules/jsdoc.cjs',
    './eslint-rules/react.cjs',
    './eslint-rules/react-hooks.cjs',
    './eslint-rules/jest.cjs',
    './eslint-rules/typescript.cjs',
    'prettier',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./{apps,packages}/**/tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.*', 'dist*', 'bin*', '*.config.*', 'eslint-rules*'],
  rules: {
    // ----------------
    // variables
    // ----------------
    // Disable
    'no-undef': ['off'],
    'no-use-before-define': ['off'],
    'no-shadow': ['off'],
  },
};
