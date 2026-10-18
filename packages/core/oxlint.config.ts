import baseConfig from '@learn-react/linter/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'react/exhaustive-effect-dependencies': ['off'],
        'react/no-react-children': ['off'],
        'react/purity': ['off'], // Calendar コンポーネントのサンプルにて `new Date()` を使うため無効化する。
      },
    },
  ],
});
