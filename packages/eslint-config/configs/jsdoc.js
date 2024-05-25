import { defineFlatConfig } from 'eslint-define-config';
import jsdocConfig from '../rules/jsdoc.js';

export default defineFlatConfig([
  jsdocConfig.ts,

  {
    ...jsdocConfig.js,
    files: ['*.@(js|cjs|mjs)'],
  },
]);
