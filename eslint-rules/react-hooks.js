import reactHooks from 'eslint-plugin-react-hooks';

// eslint-disable-next-line import/no-default-export
export default {
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: {
    'react-hooks/exhaustive-deps': ['error'],
    'react-hooks/rules-of-hooks': ['error'],
  },
};
