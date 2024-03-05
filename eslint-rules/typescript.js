// @ts-check
import typescriptEslint from '@typescript-eslint/eslint-plugin';

const recommendTypeScript = {
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },

  rules: {
    ...typescriptEslint.configs['strict-type-checked'].rules,
    ...typescriptEslint.configs['stylistic-type-checked'].rules,

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
    '@typescript-eslint/no-throw-literal': ['off'], // Suspense で throw するため無効化する。
    '@typescript-eslint/no-unsafe-call': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-unsafe-argument': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-unsafe-assignment': ['off'], // tsconfig にて設定した alias path や画像ファイルを正しく認識できず any 型と誤認するため無効化する。
    '@typescript-eslint/no-unsafe-member-access': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-unsafe-return': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/non-nullable-type-assertion-style': ['off'], // このルールは、TypeScript 4.3 で廃止されました。
    '@typescript-eslint/prefer-for-of': ['off'], // no-restricted-syntax で for-of を禁止にしている。 for 文はインデックスを使う構文に統一する。
    '@typescript-eslint/prefer-promise-reject-errors': ['off'],
  },
};

const recommendJavaScript = {
  plugins: {
    '@typescript-eslint': typescriptEslint,
  },

  rules: {
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
  },
};

export default {
  recommendTypeScript,
  recommendJavaScript,
};
