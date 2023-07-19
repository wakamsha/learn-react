module.exports = {
  extends: [
    'airbnb-base',
    './eslint-rules/best-practices.cjs',
    './eslint-rules/errors.cjs',
    './eslint-rules/es6.cjs',
    './eslint-rules/imports.cjs',
    './eslint-rules/style.cjs',
    './eslint-rules/jsdoc.cjs',
    './eslint-rules/jsx-a11y.cjs',
    './eslint-rules/react.cjs',
    './eslint-rules/react-hooks.cjs',
    './eslint-rules/jest.cjs',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
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

    // ----------------
    // typescript
    // ----------------
    // Enable
    '@typescript-eslint/ban-types': ['error'],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/dot-notation': ['error'],
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreIIFE: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],
    // Disable
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unsafe-call': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-unsafe-argument': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-unsafe-assignment': ['off'], // tsconfig にて設定した alias path や画像ファイルを正しく認識できず any 型と誤認するため無効化する。
    '@typescript-eslint/no-unsafe-member-access': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-unsafe-return': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-use-before-define': ['off'],
  },
  overrides: [
    // ----------------
    // typescript
    // ----------------
    {
      files: ['*.js', '*.mjs'],
      rules: {
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
};
