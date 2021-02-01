const fs = require('fs');
const { resolve } = require('path');
const ejs = require('ejs');
const glob = require('glob');

const TARGET_FILES = glob.sync(resolve(__dirname, '../../{core,catalog}/src/{components,hooks}/**/index.story.tsx'));

function capitalize(str) {
  return `-${str.replace(/_/g, '-')}`.replace(/-(\w)/g, (_, m) => m.toUpperCase());
}

function addPath(fileLocations, acc) {
  const location = fileLocations.shift();

  let component = acc.find(item => item.name === capitalize(location));

  if (!component) {
    component = { name: capitalize(location) };
    acc.push(component);
  }

  if (fileLocations.length) {
    addPath(fileLocations, component.children || (component.children = []));
  }

  return acc;
}

const importItems = TARGET_FILES.map(rawPath => {
  const path = rawPath.replace(/^\/.+\/learn-react\/packages/, '@learn-react').replace(/\/src|\.tsx/g, '');

  return {
    path,
    storyName: capitalize(path.split('/').slice(-2)[0]),
  };
}).flat(2);

const storyTree = Object.values(TARGET_FILES).reduce(
  (acc, path) => addPath(path.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, '').split('/'), acc),
  [],
);

ejs.renderFile('./templates/index.ejs', { importItems, storyTree }, (_, output) => {
  fs.writeFileSync('./src/Stories.ts', output, 'utf8');
});
