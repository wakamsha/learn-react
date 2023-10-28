import js from '@eslint/js';
import typescriptEslintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import bestPracticesConfig from './eslint-rules/best-practices.js';
import errorsConfig from './eslint-rules/errors.js';
import es6Config from './eslint-rules/es6.js';
import importConfig from './eslint-rules/imports.js';
import jestConfig from './eslint-rules/jest.js';
import jsDocConfig from './eslint-rules/jsdoc.js';
import jsxA11yConfig from './eslint-rules/jsx-a11y.js';
import promiseConfig from './eslint-rules/promise.js';
import reactHooksConfig from './eslint-rules/react-hooks.js';
import reactConfig from './eslint-rules/react.js';
import styleConfig from './eslint-rules/style.js';
import typescriptConfig from './eslint-rules/typescript.js';
import variablesConfig from './eslint-rules/variables.js';

export default [
  {
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        sourceType: 'module',
        project: ['./{apps,packages}/**/tsconfig.json'],
      },
    },
  },

  {
    ignores: ['**/dist/**', '.stylelintrc.cjs', '.eslintrc.cjs', '**/*.config.*', 'eslint-rules/*', '**/bin/*'],
  },

  js.configs.recommended,
  errorsConfig,
  bestPracticesConfig,
  es6Config,
  styleConfig,
  variablesConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-redeclare': ['off'],
    },
  },

  /* typescript */
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...typescriptConfig.recommendTypeScript,
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...typescriptConfig.recommendJavaScript,
  },

  /* import */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    ...importConfig,
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      'import/no-default-export': ['off'],
    },
  },

  /* promise */
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    ...promiseConfig,
  },

  /* jsx-a11y */
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...jsxA11yConfig,
  },

  /* jsdoc */
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...jsDocConfig.recommendTypescript,
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...jsDocConfig.recommendJavaScript,
  },
  {
    files: ['apps/{routing,statement}/**/*', 'packages/try/**/*', '**/*.story.tsx'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-description': ['off'],
      'jsdoc/require-param-description': ['off'],
    },
  },

  /* jest */
  {
    files: ['**/*.test.*', '**/*.test.tsx'],
    ...jestConfig,
  },

  /* react */
  {
    files: ['**/*.tsx', '**/*.ts'],
    ...reactConfig,
  },

  /* react hooks */
  {
    files: ['**/*.tsx', '**/*.ts'],
    ...reactHooksConfig,
  },

  /* prettier */
  eslintConfigPrettier,
];
