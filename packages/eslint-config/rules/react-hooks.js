import { defineFlatConfig } from 'eslint-define-config';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineFlatConfig({
  plugins: {
    'react-hooks': reactHooks,
  },

  rules: {
    'react-hooks/exhaustive-deps': ['error'],
    'react-hooks/rules-of-hooks': ['error'],
  },
});
