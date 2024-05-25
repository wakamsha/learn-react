import essentials from '@learn-react/eslint-config/essentials';
import jsdoc from '@learn-react/eslint-config/jsdoc';
import react from '@learn-react/eslint-config/react';
import testReact from '@learn-react/eslint-config/test/react';
import typescript from '@learn-react/eslint-config/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{ts,tsx}'],
  },

  ...essentials,

  ...[
    ...jsdoc,
    {
      files: ['**/*.story.tsx'],
      rules: {
        'jsdoc/require-jsdoc': ['off'],
        'jsdoc/require-description': ['off'],
        'jsdoc/require-param-description': ['off'],
      },
    },
  ],

  ...react,

  ...testReact,

  ...typescript,
  // {
  //   ...typescript,
  //   languageOptions: {
  //     ...typescript.languageOptions,
  //     parserOptions: {
  //       ...typescript.languageOptions.parserOptions,
  //       project: ['./tsconfig.json'],
  //       // tsconfigRootDir: import.meta.dirname,
  //     },
  //   },
  // },

  eslintConfigPrettier,
];
