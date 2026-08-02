import baseConfig from '@learn-react/linter/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'node/no-top-level-await': ['off'],
        'node/no-sync': ['off'],
      },
    },
  ],
});
