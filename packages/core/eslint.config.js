import essentials from '@learn-react/eslint-config/essentials';
import typescript from '@learn-react/eslint-config/typescript';

export default [
  {
    files: ['**/*.{ts,tsx}'],
  },
  essentials,

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
