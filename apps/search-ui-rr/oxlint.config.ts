import baseConfig from '@learn-react/linter/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  ignorePatterns: ['**/*.css.d.ts'],
  overrides: [
    {
      files: ['src/**/*'],
      rules: {
        'jsx-a11y/label-has-associated-control': [
          'error',
          {
            controlComponents: ['TextInput', 'TextArea'],
          },
        ],
      },
    },
    {
      files: ['src/**/route.tsx'],
      rules: {
        'react/only-export-components': ['off'],
      },
    },
  ],
});
