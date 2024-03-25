// @ts-check
import promisePlugin from 'eslint-plugin-promise';

export default {
  plugins: {
    promise: promisePlugin,
  },
  rules: {
    ...promisePlugin.configs.recommended.rules,

    // Require returning inside each `then()` to create readable and reusable Promise chains.
    // https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/always-return.md
    // React.Suspense など戻り値を前提としないユースケースでは、かえって混乱させる可能性がある。
    'promise/always-return': ['off', { ignoreLastCallback: true }],

    // Disallow nested `then()` or `catch()` statements.
    // https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-nesting.md
    // ネストを禁止にすることで、かえって複雑さが増す可能性がある。
    'promise/no-nesting': ['off'],
  },
};
