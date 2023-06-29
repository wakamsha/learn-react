import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['**/dist/**/*', '**/bin/**/*', '**/*.config.*', '.prettierrc.*'],
  },
  {
    plugins: {
      '@typescript-eslint': typescript,
    },
    files: ['**/*.ts{,x}'],
    ignores: ['**/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        project: ['**/tsconfig.json'],
      },
    },
    rules: {
      ...typescript.configs['recommended'].rules,
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/ban-types': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/dot-notation': ['error'],
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      '@typescript-eslint/no-useless-constructor': ['error'],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unsafe-call': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
      '@typescript-eslint/no-unsafe-argument': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
      '@typescript-eslint/no-unsafe-assignment': ['off'], // tsconfig にて設定した alias path や画像ファイルを正しく認識できず any 型と誤認するため無効化する。
      '@typescript-eslint/no-unsafe-member-access': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
      '@typescript-eslint/no-unsafe-return': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
      '@typescript-eslint/no-use-before-define': ['off'],
    },
  },
  {
    plugins: {
      import: pluginImport,
    },
    files: ['**/*.ts{,x}', '**/*.js', '*.mjs'],
    ignores: ['*.config.*', '**/*.d.ts'],
    rules: {
      'import/no-default-export': ['error'],
      'import/extensions': ['off'], // import path に拡張子を含めることを強制するため無効化する。
      'import/no-extraneous-dependencies': ['off'], // プロジェクトルートにある node モジュールの import を指摘するため無効化する。
      'import/no-unresolved': ['off'], // tsconfig にて設定した alias path を認識できないため無効化する。
      'import/prefer-default-export': ['off'],
    },
  },
  {
    plugins: {
      react: pluginReact,
    },
    files: ['**/*.ts{,x}'],
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
      // 'react/jsx-key': ['off'],
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
      'react/prefer-read-only-props': ['error'],
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
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    files: ['**/*.ts{,x}'],
    ignores: ['**/stores/**/*.ts'],
    rules: {
      'react-hooks/exhaustive-deps': ['error'],
      'react-hooks/rules-of-hooks': ['error'],
    },
  },
  {
    files: ['**/*.ts{,x}', '**/*.js', '*.mjs'],
    rules: {
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'no-case-declarations': ['error'],
      'no-console': [
        'error',
        {
          allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
        },
      ],
      'no-param-reassign': ['error'],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            // {
            //   name: 'path-to-foo',
            //   importNames: ['module-name'],
            //   message: '代わりに `path-to-bar` の `module-name` をお使いください。',
            // },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Do not declare enums',
        },
      ],
      'no-return-assign': ['error'],
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'class-methods-use-this': ['off'],
      'consistent-return': ['off'], // TypeScript のフロー解析を考慮できないため false positive が発生する
      'default-case': ['off'], // switch の条件式に渡される値の型次第では default は不要となる。
      'max-classes-per-file': ['off'],
      'no-bitwise': ['off'],
      'no-undef': ['off'],
      'no-use-before-define': ['off'],
      'no-useless-constructor': ['off'],
      'no-nested-ternary': ['off'],
      'no-plusplus': ['off'],
      'no-shadow': ['off'],
      'no-throw-literal': ['off'],
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
];
