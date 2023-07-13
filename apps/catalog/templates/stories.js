/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * catalog の `src/constants/Stories.ts` を生成するテンプレートです。
 *
 * @param   {string[]} importPaths  各ストーリーのインポートパスを構成する部分文字列の配列
 * @param   {object}   storyTreeMap 各ストーリーのツリー構造データ
 * @returns {string}                `src/constants/Stories.ts` となるコード文字列。
 */
export function template(importPaths, storyTreeMap) {
  return `/* eslint-disable no-template-curly-in-string */
/*
 * NOTE: This class is auto generated by /wakamsha/learn-react/packages/catalog
 * Do not edit the class manually.
 */
${importPaths
  .map(
    (path) =>
      `import { Story as ${path
        .split('/')
        .filter((fragment) => fragment !== 'index')
        .map(pascalCase)
        .join('')} } from '@learn-react/${path}.story';`,
  )
  .join(`\n`)}

  export const stories = {
    ${storyTreeMap.map((item) => makeTree(item))}
  };
  `;
}

function makeTree({ name, sourceCode, children }, prefix = '') {
  const optimizedName = `${prefix}${pascalCase(name)}`;

  return children
    ? children.every(({ name }) => name === 'index')
      ? `'${name}': { Component: ${optimizedName}, sourceCode: ${JSON.stringify(children[0]?.sourceCode)} }`
      : `'${name}': { ${children.map((subPackage) => makeTree(subPackage, optimizedName))} }`
    : `'${name}': { Component: ${name === 'index' ? prefix : optimizedName}, sourceCode: ${JSON.stringify(
        sourceCode,
      )} }`;
}

/**
 * 文字列を PascalCase に変換する。
 *
 * camelCase, kebab-case, snake_case な文字列が対象。
 *
 * @param   {string} value 変換する文字列
 * @returns {string}       PascalCase に変換された文字列
 */
function pascalCase(value) {
  return `-${value.replace(/_/g, '-')}`.replace(/-(\w)/g, (_, m) => m.toUpperCase());
}
