import baseConfig from '@learn-react/linter/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'react/no-react-children': ['off'],
      },
    },
  ],
});
