module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/node_modules/**'],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'function-name-case': null,
    'function-no-unknown': null,
    'property-no-vendor-prefix': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'value-keyword-case': null,
  },
};
