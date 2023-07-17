// @ts-check
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import bestPractices from './eslint-rules/best-practices.js';
import imports from './eslint-rules/imports.js';
import jsdoc from './eslint-rules/jsdoc.js';
import reactHooks from './eslint-rules/react-hooks.js';
import react from './eslint-rules/react.js';

export default [
  {
    ignores: ['**/dist/**/*', '**/bin/**/*', '**/*.config.*', '.prettierrc.*'],
  },
  {
    ...bestPractices,
    files: ['**/*.ts{,x}', '**/*.js', '*.mjs'],
  },
  // origin
  // {
  //   files: ['**/*.ts{,x}', '**/*.js', '*.mjs'],
  //   rules: {
  //     'lines-between-class-members': [
  //       'error',
  //       'always',
  //       {
  //         exceptAfterSingleLine: true,
  //       },
  //     ],
  //     'no-console': [
  //       'error',
  //       {
  //         allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
  //       },
  //     ],
  //     'no-restricted-imports': [
  //       'error',
  //       {
  //         paths: [
  //           // {
  //           //   name: 'path-to-foo',
  //           //   importNames: ['module-name'],
  //           //   message: '代わりに `path-to-bar` の `module-name` をお使いください。',
  //           // },
  //         ],
  //       },
  //     ],
  //     'no-restricted-syntax': [
  //       'error',
  //       {
  //         selector: 'TSEnumDeclaration',
  //         message: 'Do not declare enums',
  //       },
  //     ],
  //     'no-unused-expressions': [
  //       'error',
  //       {
  //         allowShortCircuit: true,
  //         allowTernary: true,
  //       },
  //     ],
  //     // 'no-bitwise': ['off'],
  //     // 'no-undef': ['off'],
  //     // 'no-use-before-define': ['off'],
  //     // 'no-useless-constructor': ['off'],
  //     // 'no-nested-ternary': ['off'],
  //     // 'no-plusplus': ['off'],
  //     // 'no-shadow': ['off'],
  //   },
  // },
  // typescript
  {
    plugins: {
      '@typescript-eslint': typescript,
    },
    files: ['**/*.ts{,x}'],
    ignores: ['**/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        project: ['**/tsconfig.json'],
      },
    },
    rules: {
      ...typescript.configs['recommended'].rules,
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
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
  },
  {
    ...imports,
    files: ['**/*.ts{,x}', '**/*.js', '*.mjs'],
    ignores: ['*.config.*', '**/*.d.ts'],
  },
  {
    ...react,
    files: ['**/*.ts{,x}'],
  },
  {
    ...reactHooks,
    files: ['**/*.ts{,x}'],
    ignores: ['**/stores/**/*.ts'],
  },
  // prettier
  {
    rules: {
      ...prettier.rules,
    },
  },
  // jsdoc
  {
    ...jsdoc,
    files: ['**/*.ts{,x}', '**/*.js', '**/*.mjs'],
  },
  {
    ...jsdoc,
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      'jsdoc/require-param-type': ['error'],
      'jsdoc/require-returns': ['error'],
      'jsdoc/require-returns-type': ['error'],
      'jsdoc/no-types': ['off'],
    },
  },
  {
    ...jsdoc,
    files: ['apps/{routing,statement}/**/*', 'packages/try/**/*', '**/*.story.tsx'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-param-description': ['off'],
    },
  },
];
