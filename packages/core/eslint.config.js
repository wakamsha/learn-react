import essentials from '@learn-react/eslint-config/essentials';
import testReact from '@learn-react/eslint-config/test/react';
import typescript from '@learn-react/eslint-config/typescript';

export default [
  {
    files: ['**/*.{ts,tsx}'],
  },
  essentials,

  testReact,

  typescript,
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
];
