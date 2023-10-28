// @ts-check
import promisePlugin from 'eslint-plugin-promise';

export default {
  plugins: {
    promise: promisePlugin,
  },
  rules: {
    ...promisePlugin.configs.recommended.rules,

    'promise/always-return': ['off'],
    'promise/no-nesting': ['off'],
  },
};
