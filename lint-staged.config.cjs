module.exports = {
  './**/*.{js,ts,tsx}': ['cspell', 'prettier -c', 'eslint -c .eslintrc.cjs'],
  './**/*.{ts,tsx}': ['stylelint --cache'],
  './**/*.md': ['cspell', 'prettier -c'],
};
