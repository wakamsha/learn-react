module.exports = {
  plugins: ['react'],
  rules: {
    // 'react/display-name': ['off'],
    // 'react/forbid-prop-types': ['off'],
    // 'react/forbid-dom-props': ['off'],
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': ['error'],
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
    // 'react/jsx-handler-names': ['off', {
    //   eventHandlerPrefix: 'handle',
    //   eventHandlerPropPrefix: 'on',
    // }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': ['error'],
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
    // 'react/jsx-no-literals': ['off', { noStrings: true }],
    'react/jsx-no-undef': ['error'],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    // 'react/sort-prop-types': ['off'],
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
    // 'react/jsx-sort-default-props': ['off'],
    // 'react/jsx-uses-react': ['off'],
    // 'react/jsx-uses-vars': ['off'],
    'react/no-danger': ['warn'],
    'react/no-deprecated': ['error'],
    // 'react/no-did-mount-set-state': ['off'],
    'react/no-did-update-set-state': ['error'],
    'react/no-will-update-set-state': ['error'],
    'react/no-direct-mutation-state': ['error'],
    'react/no-is-mounted': ['error'],
    // 'react/no-multi-comp': ['off'],
    // 'react/no-set-state': ['off'],
    'react/no-string-refs': ['error'],
    'react/no-unknown-property': ['error'],
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
    // 'react/prop-types': ['off'],
    'react/prop-types': ['error', { skipUndeclared: false }],
    // 'react/react-in-jsx-scope': ['error'],
    'react/require-render-return': ['error'],
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
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-no-comment-textnodes': ['error'],
    'react/no-render-return-value': ['error'],
    // 'react/require-optimization': ['off', { allowDecorators: [] }],
    'react/no-find-dom-node': ['error'],
    'react/forbid-component-props': [
      'off',
      {
        // ここに列挙した Prop の使用を禁止できる。
        forbid: [
          // {
          //   propName: 'someProp',
          //   disallowedFor: ['SomeComponent', 'AnotherComponent'],
          //   message: 'Avoid using someProp for SomeComponent and AnotherComponent',
          // },
        ],
      },
    ],
    'react/forbid-elements': [
      'off',
      {
        // ここに列挙した JSX 要素の使用を禁止できる。
        forbid: [
          // {
          //   element: 'button',
          //   message: 'Use `Button` instead.'
          // }
        ],
      },
    ],
    'react/no-danger-with-children': ['error'],
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    'react/style-prop-object': ['error'],
    'react/no-unescaped-entities': ['error'],
    'react/no-children-prop': ['error'],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    // 'react/jsx-space-before-closing': ['off', 'always'],
    // 'react/no-array-index-key': ['off'],
    // 'react/require-default-props': ['off'],
    // 'react/forbid-foreign-prop-types': ['off', { allowInPropTypes: true }],
    'react/void-dom-elements-no-children': ['error'],
    // 'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],
    // 'react/no-redundant-should-component-update': ['error'],
    // 'react/no-unused-state': ['error'],
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
    // 'react/button-has-type': ['error'],
    'react/jsx-child-element-spacing': ['error'],
    'react/no-this-in-sfc': ['error'],
    // 'react/jsx-max-depth': ['off'],
    'react/jsx-props-no-multi-spaces': ['error'],
    // 'react/no-unsafe': ['off'],
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
    // 'react/prefer-read-only-props': ['error'],
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
    // 'react/no-adjacent-inline-elements': ['off'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // 'react/jsx-newline': ['off'],
    'react/jsx-no-constructed-context-values': ['error'],
    'react/no-unstable-nested-components': ['error'],
    'react/no-namespace': ['error'],
    // 'react/prefer-exact-props': ['error'],
    'react/no-arrow-function-lifecycle': ['error'],
    'react/no-invalid-html-attribute': ['error'],
    // 'react/no-unused-class-component-methods': ['error'],
  },
};
