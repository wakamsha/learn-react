module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
  },
  env: {
    browser: true,
    es6: true,
  },
  globals: {},
  plugins: ['react', 'react-hooks', 'sort-imports-es6-autofix'],
  rules: {
    // Enable
    '@typescript-eslint/dot-notation': ['error'],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'func-names': ['error'],
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
      }
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['draft'],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: 'Do not declare enums',
      },
    ],
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-key': ['error'],
    'react/jsx-no-target-blank': ['error'],
    'react/sort-comp': ['error'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    // Disable
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': ['off'],
    'import/order': ['off'],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/accessible-emoji': ['off'],
    'jsx-a11y/control-has-associated-label': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/media-has-caption': ['off'],
    'jsx-a11y/mouse-events-have-key-events': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'default-case': ['off'],
    'max-classes-per-file': ['off'],
    'no-bitwise': ['off'],
    'no-undef': ['off'],
    'no-use-before-define': ['off'],
    'no-useless-constructor': ['off'],
    'no-nested-ternary': ['off'],
    'no-plusplus': ['off'],
    'no-return-assign': ['off'],
    'no-shadow': ['off'],
    'no-throw-literal': ['off'],
    'no-unused-expressions': ['off'],
    'sort-imports': ['off'],
    'react/button-has-type': ['off'],
    'react/jsx-indent': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/no-array-index-key': ['off'],
  },
  overrides: [
    {
      files: ['./**/stores/**/*.ts'],
      rules: {
        'react-hooks/rules-of-hooks': ['off'],
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
};
