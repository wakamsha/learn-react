import confusingBrowserGlobals from 'confusing-browser-globals';

export default {
  rules: {
    // enforce or disallow variable initializations at definition
    'init-declarations': 'off',

    // disallow the catch clause parameter name being the same as a variable in the outer scope
    'no-catch-shadow': 'off',

    // disallow deletion of variables
    'no-delete-var': 'error',

    // disallow labels that share a name with a variable
    // https://eslint.org/docs/rules/no-label-var
    'no-label-var': 'error',

    // disallow specific globals
    'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message: 'Use Number.isFinite instead global `isFinite`',
      },
      {
        name: 'isNaN',
        message: 'Use Number.isNaN instead global `isNaN`',
      },
    ].concat(
      confusingBrowserGlobals.map((g) => ({
        name: g,
        message: `Use window.${g} instead.`,
      })),
    ),

    // disallow declaration of variables already declared in the outer scope
    'no-shadow': 'off',

    // disallow shadowing of names such as arguments
    'no-shadow-restricted-names': 'error',

    // disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undef': 'off',

    // disallow use of undefined when initializing variables
    'no-undef-init': 'error',

    // disallow use of undefined variable
    // https://eslint.org/docs/rules/no-undefined
    // TODO: enable?
    'no-undefined': 'off',

    // disallow declaration of variables that are not used in the code
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    // disallow use of variables before they are defined
    // https://eslint.org/docs/latest/rules/no-use-before-define
    'no-use-before-define': ['off'],
  },
};
