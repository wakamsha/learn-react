import confusingBrowserGlobals from 'confusing-browser-globals';

export default {
  rules: {
    // enforce or disallow variable initializations at definition
    // https://eslint.org/docs/rules/init-declarations
    'init-declarations': 'off',

    // Deprecated
    // disallow the catch clause parameter name being the same as a variable in the outer scope
    // https://eslint.org/docs/rules/no-catch-shadow
    'no-catch-shadow': 'off',

    // disallow deletion of variables
    // https://eslint.org/docs/rules/no-delete-var
    'no-delete-var': 'error',

    // disallow labels that share a name with a variable
    // https://eslint.org/docs/rules/no-label-var
    'no-label-var': 'error',

    // disallow specific globals
    // https://eslint.org/docs/rules/no-restricted-globals
    'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message: 'Use Number.isFinite instead.',
      },
      {
        name: 'isNaN',
        message: 'Use Number.isNaN instead.',
      },
    ].concat(
      confusingBrowserGlobals.map((g) => ({
        name: g,
        message: `Use window.${g} instead.`,
      })),
    ),

    // disallow declaration of variables already declared in the outer scope
    // https://eslint.org/docs/rules/no-shadow
    // コールバック関数やループカウンターなど生存期間の短い変数まで警告されるため、offにする。
    'no-shadow': 'off',

    // disallow shadowing of names such as arguments
    // https://eslint.org/docs/rules/no-shadow-restricted-names
    'no-shadow-restricted-names': 'error',

    // disallow use of undeclared variables unless mentioned in a /*global */ block
    // https://eslint.org/docs/rules/no-undef
    // `window`, `document`, `console` といった自明な API まで警告されるため、offにする。
    'no-undef': 'off',

    // disallow use of undefined when initializing variables
    // https://eslint.org/docs/rules/no-undef-init
    'no-undef-init': 'error',

    // disallow use of undefined variable
    // https://eslint.org/docs/rules/no-undefined
    'no-undefined': 'off',

    // disallow declaration of variables that are not used in the code
    // https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    // disallow use of variables before they are defined
    // https://eslint.org/docs/latest/rules/no-use-before-define
    // 可読性を考慮した記述順序を優先するため、offにする。
    'no-use-before-define': ['off'],
  },
};
