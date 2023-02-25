module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    '@linaria/stylelint',
  ],
  ignoreFiles: ['**/node_modules/**'],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'function-name-case': null,
    'function-no-unknown': null,
    'property-no-vendor-prefix': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'value-keyword-case': null,
  },
};
