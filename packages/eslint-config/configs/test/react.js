// @ts-check
import { defineFlatConfig } from 'eslint-define-config';
import vitest from 'eslint-plugin-vitest';
import jestDomConfig from '../../rules/jest-dom.js';
import testingLibraryConfig from '../../rules/testing-library/react.js';
import vitestConfig from '../../rules/vitest.js';

export default defineFlatConfig([
  {
    settings: {
      vitest: {
        typecheck: true,
      },
    },

    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },

    ...vitestConfig,
    ...jestDomConfig,
    ...testingLibraryConfig,

    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
  },
]);
