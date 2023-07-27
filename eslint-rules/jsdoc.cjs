module.exports = {
  extends: ['plugin:jsdoc/recommended-typescript-error'],
  plugins: ['jsdoc'],
  rules: {
    // Enable
    'jsdoc/check-param-names': [
      'error',
      {
        checkDestructured: false,
      },
    ],
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['remarks', 'typeParam'],
      },
    ],
    'jsdoc/require-description': [
      'error',
      {
        contexts: [
          'ArrowFunctionExpression',
          'ClassDeclaration',
          'ClassExpression',
          'FunctionDeclaration',
          'FunctionExpression',
          'MethodDefinition',
          'PropertyDefinition',
          'VariableDeclaration',
          'TSInterfaceDeclaration',
          'TSTypeAliasDeclaration',
          'TSPropertySignature',
          'TSMethodSignature',
        ],
      },
    ],
    'jsdoc/require-hyphen-before-param-description': ['error', 'always'],
    'jsdoc/require-jsdoc': [
      'error',
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
        contexts: [
          'PropertyDefinition',
          'VariableDeclaration',
          'TSInterfaceDeclaration',
          'TSTypeAliasDeclaration',
          'TSPropertySignature',
          'TSMethodSignature',
        ],
        checkConstructors: false,
      },
    ],
    'jsdoc/require-param': [
      'error',
      {
        checkDestructuredRoots: false,
      },
    ],
    'jsdoc/tag-lines': [
      'error',
      'always',
      {
        startLines: 1,
        applyToEndTag: false,
      },
    ],
    'jsdoc/sort-tags': [
      'error',
      {
        reportIntraTagGroupSpacing: false,
      },
    ],
    // Disable
    'jsdoc/require-returns': ['off'],
  },

  overrides: [
    {
      files: ['*.js', '*.mjs'],
      rules: {
        'jsdoc/require-param-type': ['error'],
        'jsdoc/require-returns': ['error'],
        'jsdoc/require-returns-type': ['error'],
        'jsdoc/no-types': ['off'],
      },
    },
    {
      files: ['./apps/{routing,statement}/**/*', './packages/try/**/*', '**/*.story.tsx'],
      rules: {
        'jsdoc/require-jsdoc': ['off'],
        'jsdoc/require-description': ['off'],
        'jsdoc/require-param-description': ['off'],
      },
    },
  ],
};
