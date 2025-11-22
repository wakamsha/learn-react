export default {
  'css-in-js': {
    extends: ['@wakamsha/stylelint-config/essentials', '@wakamsha/stylelint-config/css-in-js'],
    ignoreFiles: ['**/node_modules/**'],
  },
  'css-modules': {
    extends: ['@wakamsha/stylelint-config/essentials', '@wakamsha/stylelint-config/css-modules'],
    ignoreFiles: ['**/node_modules/**', '**/*.{js,ts,tsx}', '**/dist/**'],
  },
};
