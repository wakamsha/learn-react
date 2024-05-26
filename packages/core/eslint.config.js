// @ts-check
import { essentials, jsdoc, react, test, typescript } from '@learn-react/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{ts,tsx}'],
  },

  ...essentials,

  ...jsdoc,
  {
    files: ['**/*.story.tsx'],
    rules: {
      'jsdoc/require-jsdoc': ['off'],
      'jsdoc/require-description': ['off'],
      'jsdoc/require-param-description': ['off'],
    },
  },

  ...react,

  ...test.react,

  ...typescript,

  eslintConfigPrettier,
];
