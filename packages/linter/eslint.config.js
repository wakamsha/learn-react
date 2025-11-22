// @ts-check
import { essentials, jsdoc, react, test, typescript } from '@wakamsha/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';

export default [
  {
    ignores: ['**/dist/*', '**/build/*', '**/bin/*'],
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
  {
    files: ['*.config.*'],
    rules: {
      'no-restricted-exports': ['off'],
      'import/no-extraneous-dependencies': ['off'],
    },
  },

  /* prettier */
  eslintConfigPrettier,

  /* oxlint */
  ...oxlint.configs['flat/all'],
];
