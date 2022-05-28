export function template(importPaths, storyTreeMap) {
  return `
/*
 * NOTE: This class is auto generated by /wakamsha/learn-react/packages/catalog
 * Do not edit the class manually.
 */
${importPaths
  .map(
    path =>
      `import { Story as ${path
        .split('/')
        .filter(fragment => fragment !== 'index')
        .map(pascalCase)
        .join('')} } from '@learn-react/${path}.story';`,
  )
  .join(`\n`)}

  export const stories = {
    ${storyTreeMap.map(item => makeTree(item))}
  };
  `;
}

function makeTree({ name, children }, prefix = '') {
  const optimizedName = `${prefix}${pascalCase(name)}`;

  return children
    ? `${name}: { ${children.map(subPackage => makeTree(subPackage, optimizedName))} }`
    : `${name}: ${optimizedName}`;
}

/**
 * 文字列を PascalCase に変換する。
 *
 * camelCase, kebab-case, snake_case な文字列が対象。
 *
 * @param {string} value 変換する文字列
 * @returns PascalCase に変換された文字列
 */
function pascalCase(str) {
  return `-${str.replace(/_/g, '-')}`.replace(/-(\w)/g, (_, m) => m.toUpperCase());
}
