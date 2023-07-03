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
  // typescript
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
  // import
  {
    plugins: {
      import: pluginImport,
    },
    files: ['**/*.ts{,x}', '**/*.js', '*.mjs'],
    ignores: ['*.config.*', '**/*.d.ts'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.json'],
        },
      },
      'import/extensions': ['.js', '.mjs', '.jsx', 'ts', 'tsx'],
      'import/core-modules': [],
      'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
    },
    rules: {
      // 'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],

      // ensure named imports coupled with named exports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
      'import/named': ['error'],

      // ensure default import coupled with default export
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
      'import/default': ['off'],

      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
      'import/namespace': ['off'],

      // Helpful warnings:

      // disallow invalid exports, e.g. multiple defaults
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
      'import/export': ['error'],

      // do not allow a default import name to match a named export
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
      'import/no-named-as-default': ['error'],

      // warn on accessing default export property names that are also named exports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
      'import/no-named-as-default-member': ['error'],

      // disallow use of jsdoc-marked-deprecated imports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
      'import/no-deprecated': ['off'],

      // Forbid the use of extraneous packages
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
      // paths are treated both as absolute paths, and relative to process.cwd()
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'test/**', // tape, common npm pattern
            'tests/**', // also common npm pattern
            'spec/**', // mocha, rspec-like pattern
            '**/__tests__/**', // jest pattern
            '**/__mocks__/**', // jest pattern
            'test.{js,jsx}', // repos with a single test file
            'test-*.{js,jsx}', // repos with multiple top-level test files
            '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
            '**/jest.config.js', // jest config
            '**/jest.setup.js', // jest setup
            '**/vue.config.js', // vue-cli config
            '**/webpack.config.js', // webpack config
            '**/webpack.config.*.js', // webpack config
            '**/rollup.config.js', // rollup config
            '**/rollup.config.*.js', // rollup config
            '**/protractor.conf.js', // protractor config
            '**/protractor.conf.*.js', // protractor config
            '**/karma.conf.js', // karma config
            '**/.eslintrc.js', // eslint config
          ],
          optionalDependencies: false,
        },
      ],

      // Forbid mutable exports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
      'import/no-mutable-exports': ['error'],

      // Module systems:

      // disallow require()
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
      // 'import/no-commonjs': ['off'],

      // disallow AMD require/define
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
      'import/no-amd': ['error'],

      // No Node.js builtin modules
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
      // TODO: enable?
      'import/no-nodejs-modules': ['off'],

      // Style guide:

      // disallow non-import statements appearing before import statements
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
      'import/first': ['error'],

      // disallow non-import statements appearing before import statements
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/imports-first.md
      // deprecated: use `import/first`
      'import/imports-first': ['off'],

      // disallow duplicate imports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
      'import/no-duplicates': ['error'],

      // disallow namespace imports
      // TODO: enable?
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
      'import/no-namespace': ['off'],

      // Ensure consistent use of file extension within the import path
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
      // 'import/extensions': ['error'],

      // ensure absolute imports are above relative imports and that unassigned imports are ignored
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
      // TODO: enforce a stricter convention in module import order?
      'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],

      // Require a newline after the last import/require in a group
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
      'import/newline-after-import': ['error'],

      // Require modules with a single export to use a default export
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
      // 'import/prefer-default-export': ['error'],

      // Restrict which files can be imported in a given folder
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md
      // 'import/no-restricted-paths': ['off'],

      // Forbid modules to have too many dependencies
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md
      // 'import/max-dependencies': ['off', { max: 10 }],

      // Forbid import of modules using absolute paths
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
      'import/no-absolute-path': ['error'],

      // Forbid require() calls with expressions
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
      'import/no-dynamic-require': ['error'],

      // prevent importing the submodules of other modules
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md
      // 'import/no-internal-modules': ['off'],

      // Warn if a module could be mistakenly parsed as a script by a consumer
      // leveraging Unambiguous JavaScript Grammar
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
      // this should not be enabled until this proposal has at least been *presented* to TC39.
      // At the moment, it's not a thing.
      // 'import/unambiguous': ['off'],

      // Forbid Webpack loader syntax in imports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
      'import/no-webpack-loader-syntax': ['error'],

      // Prevent unassigned imports
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md
      // importing for side effects is perfectly acceptable, if you need side effects.
      // 'import/no-unassigned-import': ['off'],

      // Prevent importing the default as if it were named
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
      'import/no-named-default': ['error'],

      // Reports if a module's default export is unnamed
      // https://github.com/benmosher/eslint-plugin-import/blob/d9b712ac7fd1fddc391f7b234827925c160d956f/docs/rules/no-anonymous-default-export.md
      'import/no-anonymous-default-export': [
        'off',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],

      // This rule enforces that all exports are declared at the bottom of the file.
      // https://github.com/benmosher/eslint-plugin-import/blob/98acd6afd04dcb6920b81330114e146dc8532ea4/docs/rules/exports-last.md
      // TODO: enable?
      // 'import/exports-last': ['off'],

      // Reports when named exports are not grouped together in a single export declaration
      // or when multiple assignments to CommonJS module.exports or exports object are present
      // in a single file.
      // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/group-exports.md
      // 'import/group-exports': ['off'],

      // forbid default exports. this is a terrible rule, do not use it.
      // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-default-export.md
      'import/no-default-export': ['error'],

      // Prohibit named exports. this is a terrible rule, do not use it.
      // https://github.com/benmosher/eslint-plugin-import/blob/1ec80fa35fa1819e2d35a70e68fb6a149fb57c5e/docs/rules/no-named-export.md
      // 'import/no-named-export': ['off'],

      // Forbid a module from importing itself
      // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-self-import.md
      'import/no-self-import': ['error'],

      // Forbid cyclical dependencies between modules
      // https://github.com/benmosher/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
      'import/no-cycle': ['error', { maxDepth: '∞' }],

      // Ensures that there are no useless path segments
      // https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
      'import/no-useless-path-segments': ['error', { commonjs: true }],

      // dynamic imports require a leading comment with a webpackChunkName
      // https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/dynamic-import-chunkname.md
      // 'import/dynamic-import-chunkname': ['off'],

      // Use this rule to prevent imports to folders in relative parent paths.
      // https://github.com/benmosher/eslint-plugin-import/blob/c34f14f67f077acd5a61b3da9c0b0de298d20059/docs/rules/no-relative-parent-imports.md
      'import/no-relative-parent-imports': ['off'],

      // Reports modules without any exports, or with unused exports
      // https://github.com/benmosher/eslint-plugin-import/blob/f63dd261809de6883b13b6b5b960e6d7f42a7813/docs/rules/no-unused-modules.md
      // TODO: enable once it supports CJS
      'import/no-unused-modules': [
        'off',
        {
          ignoreExports: [],
          missingExports: true,
          unusedExports: true,
        },
      ],

      // Reports the use of import declarations with CommonJS exports in any module except for the main module.
      // https://github.com/benmosher/eslint-plugin-import/blob/1012eb951767279ce3b540a4ec4f29236104bb5b/docs/rules/no-import-module-exports.md
      'import/no-import-module-exports': [
        'error',
        {
          exceptions: [],
        },
      ],

      // Use this rule to prevent importing packages through relative paths.
      // https://github.com/benmosher/eslint-plugin-import/blob/1012eb951767279ce3b540a4ec4f29236104bb5b/docs/rules/no-relative-packages.md
      'import/no-relative-packages': ['error'],
    },
  },
  // react
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
  // react-hooks
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
  // eslint
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
  // prettier
  {
    rules: {
      ...prettier.rules,
    },
  },
];
