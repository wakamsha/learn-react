module.exports = {
  './**/*.{js,cjs,ts,tsx}': ['cspell', 'prettier -c', 'eslint'],
  './**/*.{ts,tsx}': ['stylelint --cache'],
  './**/*.md': ['cspell', 'prettier -c'],
};
