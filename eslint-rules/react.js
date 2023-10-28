// @ts-check
import react from 'eslint-plugin-react';

export default {
  plugins: {
    react,
  },

  languageOptions: {
    ...react.configs.recommended.languageOptions,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    ...react.configs.recommended.rules,

    // Enable
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': ['error'],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        ignoreDOMComponents: true,
      },
    ],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
        noSortAlphabetically: true,
      },
    ],
    'react/no-danger': ['warn'],
    'react/no-did-update-set-state': ['error'],
    'react/no-will-update-set-state': ['error'],
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
    'react/prop-types': ['error', { skipUndeclared: false }],
    'react/self-closing-comp': ['error'],
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-variables',
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^handle.+$/',
          '/^on.+$/',
          'getters',
          'setters',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'instance-methods',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    // 'react/forbid-component-props': [
    //   'error',
    //   {
    //     // ここに列挙した Prop の使用を禁止できる。
    //     forbid: [
    //       {
    //         propName: 'someProp',
    //         disallowedFor: ['SomeComponent', 'AnotherComponent'],
    //         message: 'Avoid using someProp for SomeComponent and AnotherComponent',
    //       },
    //     ],
    //   },
    // ],
    // 'react/forbid-elements': [
    //   'error',
    //   {
    //     // ここに列挙した JSX 要素の使用を禁止できる。
    //     forbid: [
    //       {
    //         element: 'button',
    //         message: 'Use `Button` instead.'
    //       }
    //     ],
    //   },
    // ],
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    'react/style-prop-object': ['error'],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/void-dom-elements-no-children': ['error'],
    'react/boolean-prop-naming': [
      'off',
      {
        propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: '',
      },
    ],
    'react/no-typos': ['error'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/destructuring-assignment': ['error', 'always'],
    'react/no-access-state-in-setstate': ['error'],
    'react/jsx-child-element-spacing': ['error'],
    'react/no-this-in-sfc': ['error'],
    'react/jsx-props-no-multi-spaces': ['error'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    'react/state-in-constructor': ['error', 'always'],
    'react/static-property-placement': ['error', 'property assignment'],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
        exceptions: [],
      },
    ],
    'react/jsx-no-script-url': [
      'error',
      [
        {
          name: 'Link',
          props: ['to'],
        },
      ],
    ],
    'react/jsx-no-useless-fragment': ['error'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-no-constructed-context-values': ['error'],
    'react/no-unstable-nested-components': ['error'],
    'react/no-namespace': ['error'],
    'react/no-arrow-function-lifecycle': ['error'],
    'react/no-invalid-html-attribute': ['error'],

    // Disable
    'react/display-name': ['off'],
    'react/jsx-uses-react': ['off'],
    'react/jsx-uses-vars': ['off'],
    'react/react-in-jsx-scope': ['off'],
  },
};
