import { defineFlatConfig } from 'eslint-define-config';
import bestPracticesConfig from '../rules/best-practices.js';
import errorsConfig from '../rules/errors.js';
import es6Config from '../rules/es6.js';
import importsConfig from '../rules/imports.js';
import promiseConfig from '../rules/promise.js';
import styleConfig from '../rules/style.js';
import variablesConfig from '../rules/variables.js';

export default defineFlatConfig([
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },

    ...bestPracticesConfig,
    ...errorsConfig,
    ...es6Config,
    ...importsConfig,
    ...promiseConfig,
    ...styleConfig,
    ...variablesConfig,
  },
]);
