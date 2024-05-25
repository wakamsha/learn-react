import typescriptEslintParser from '@typescript-eslint/parser';
import { defineFlatConfig } from 'eslint-define-config';
import typescriptConfig from '../rules/typescript.js';

export default defineFlatConfig([
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: true,
        // tsconfigRootDir: import.meta.dirname,
      },
    },

    ...typescriptConfig,

    files: ['**/*.@(ts|tsx|cts|mts)'],
  },
]);
