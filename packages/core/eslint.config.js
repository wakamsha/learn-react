import essentials from '@learn-react/eslint-config/essentials';
import react from '@learn-react/eslint-config/react';
import testReact from '@learn-react/eslint-config/test/react';
import typescript from '@learn-react/eslint-config/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{ts,tsx}'],
  },

  ...essentials,

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
