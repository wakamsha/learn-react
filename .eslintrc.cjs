module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:react/recommended',
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
    project: ['./packages/**/tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.*', '**/vite.config.ts'],
  plugins: ['react', 'react-hooks'],
  rules: {
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
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-key': ['error'],
    'react/jsx-no-target-blank': ['error'],
    'react/jsx-props-no-spreading': ['warn'],
    'react/sort-comp': ['error'],
    'react-hooks/exhaustive-deps': ['error'],
    'react-hooks/rules-of-hooks': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'func-names': ['error'],
    'import/no-default-export': ['error'],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'no-case-declarations': ['error'],
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
      },
    ],
    'no-param-reassign': ['error'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // {
          //   name: 'path-to-foo',
          //   importNames: ['module-name'],
          //   message: '代わりに `path-to-bar` の `module-name` をお使いください。',
          // },
        ],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: 'Do not declare enums',
      },
    ],
    'no-return-assign': ['error'],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

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
    'import/extensions': ['off'], // import path に拡張子を含めることを強制するため無効化する。
    'import/no-extraneous-dependencies': ['off'], // プロジェクトルートにある node モジュールの import を指摘するため無効化する。
    'import/no-unresolved': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    'import/prefer-default-export': ['off'],
    'jsx-a11y/accessible-emoji': ['off'],
    'jsx-a11y/control-has-associated-label': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/media-has-caption': ['off'],
    'jsx-a11y/mouse-events-have-key-events': ['off'],
    'jsx-a11y/no-autofocus': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'react/button-has-type': ['off'],
    'react/display-name': ['off'],
    'react/jsx-indent': ['off'],
    'react/no-array-index-key': ['off'],
    'react/prop-types': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/require-default-props': ['off'],
    'class-methods-use-this': ['off'],
    'consistent-return': ['off'], // TypeScript のフロー解析を考慮できないため false positive が発生する
    'default-case': ['off'], // switch の条件式に渡される値の型次第では default は不要となる。
    'max-classes-per-file': ['off'],
    'no-bitwise': ['off'],
    'no-undef': ['off'],
    'no-use-before-define': ['off'],
    'no-useless-constructor': ['off'],
    'no-nested-ternary': ['off'],
    'no-plusplus': ['off'],
    'no-shadow': ['off'],
    'no-throw-literal': ['off'],
  },
  overrides: [
    {
      files: ['./**/ambience.d.ts'],
      rules: {
        'import/no-default-export': ['off'],
      },
    },
    {
      files: ['./**/stores/**/*.ts'],
      rules: {
        'react-hooks/rules-of-hooks': ['off'],
      },
    },
    {
      files: ['*.js', '*.mjs'],
      rules: {
        '@typescript-eslint/ban-ts-comment': ['off'],
        '@typescript-eslint/no-var-requires': ['off'],
        'no-underscore-dangle': ['off'],
        'import/no-default-export': ['off'],
      },
    },
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
