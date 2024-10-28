export default {
  extends: ['@wakamsha/stylelint-config'],
  ignoreFiles: ['**/node_modules/**'],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'function-name-case': null,
    'function-no-unknown': null,
    'value-keyword-case': null,
  },
};
