import jsdoc from 'eslint-plugin-jsdoc';

// eslint-disable-next-line import/no-default-export
export default {
  plugins: {
    jsdoc,
  },
  rules: {
    ...jsdoc.configs['recommended-typescript-error'].rules,
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
    'jsdoc/require-param-type': ['off'],
    'jsdoc/require-returns': ['off'],
    'jsdoc/require-returns-type': ['off'],
  },
};
