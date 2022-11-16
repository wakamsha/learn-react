module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-recommended',
    '@linaria/stylelint',
  ],
  ignoreFiles: ['**/node_modules/**'],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'property-no-vendor-prefix': null,
    'function-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
