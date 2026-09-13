import baseConfig from '@learn-react/linter/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'react/exhaustive-effect-dependencies': ['off'],
        'react/memo-dependencies': ['off'],
        'react/no-deriving-state-in-effects': ['off'],
        'react/no-react-children': ['off'],
        'react/refs': ['off'],
        'react/set-state-in-effect': ['off'],
      },
    },
  ],
});
