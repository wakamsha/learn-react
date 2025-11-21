// @ts-check
import { essentials, jsdoc, react, test, typescript } from '@wakamsha/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';

export default [
  {
    ignores: [
      '**/dist/*',
      '**/build/*',
      // '**/vitest.setup.*',
      // '**/*.config.*',
      '**/bin/*',
      // '**/catalog/templates/*',
      // '**/.react-router/*',
      // '**/apps/catalog/**/Stories.ts',
    ],
  },

  ...essentials,
  ...typescript,
  ...react,
  ...jsdoc,
  ...test.essentials,
  ...test.react,

  {
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
          ignore: [/\d_\w+\.story.tsx$/],
        },
      ],
    },
  },

  // {
  //   files: ['**/react-router-{spa,ssr}/**/*'],
  //   rules: {
  //     'import/consistent-type-specifier-style': [
  //       'error',
  //       // React Router の Route Module Type は top-level import が必要。
  //       // see: https://reactrouter.com/how-to/route-module-type-safety#2-include-the-generated-types-in-tsconfig
  //       'prefer-top-level',
  //     ],
  //   },
  // },

  // {
  //   files: ['**/react-router-{spa,ssr}/**/{layouts,routes}/**/*', '**/react-router-{spa,ssr}/**/{root,routes}.*'],
  //   rules: {
  //     'import/no-default-export': ['off'],
  //   },
  // },

  {
    files: ['*.config.*'],
    rules: {
      'no-restricted-exports': ['off'],
      'import/no-extraneous-dependencies': ['off'],
    },
  },

  // {
  //   files: ['apps/react-router-ssr/**/*'],
  //   rules: {
  //     // React.Suspense で throw するため無効化する。
  //     '@typescript-eslint/no-throw-literal': ['off'],
  //   },
  // },

  // {
  //   rules: {
  //     'jsx-a11y/no-autofocus': ['off'],
  //   },
  // },

  // {
  //   files: ['apps/{routing,statement}/**/*', 'packages/try/**/*', '**/*.story.tsx'],
  //   rules: {
  //     'jsdoc/require-jsdoc': ['off'],
  //     'jsdoc/require-description': ['off'],
  //     'jsdoc/require-param-description': ['off'],
  //   },
  // },

  // {
  //   rules: {
  //     'jsx-a11y/label-has-associated-control': [
  //       'error',
  //       {
  //         controlComponents: ['TextInput', 'TextArea'],
  //       },
  //     ],
  //   },
  // },

  /* prettier */
  eslintConfigPrettier,

  /* oxlint */
  ...oxlint.configs['flat/all'],
];
