module.exports = ({ importItems, storyTree }) => `
/*
* NOTE: This class is auto generated by /wakamsha/learn-react/packages/catalog
* Do not edit the class manually.
*/
${importItems.map(({ path, storyName }) => `import { Story as ${storyName} } from '${path}';`).join(`\n`)}

export const stories = {
  ${storyTree.map(
    package =>
      `${package.name}: {
        ${package.children.map(
          type =>
            `${type.name}: {
              ${type.children.map(({ name, children }) =>
                children
                  ? `${name}: {
                    ${children.map(category => `${category.name}`)}
                  }`
                  : `${name}`,
              )}
            }`,
        )}
      }`,
  )}
};
`;
