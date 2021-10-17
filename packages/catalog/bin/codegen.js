// @ts-check
const fs = require('fs');
const { resolve } = require('path');
const chokidar = require('chokidar');
const glob = require('glob');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const storySpecTemplate = require('../templates/storySpec');
const storiesTemplate = require('../templates/stories');

// @ts-ignore
const { watch } = yargs(hideBin(process.argv)).option('watch', {
  alias: 'w',
  type: 'boolean',
  describe: 'ターゲットファイルの変更を監視して自動的にコード生成を実行します。',
}).argv;

const TARGET_FILES = glob.sync(
  resolve(__dirname, '../../{core,catalog}/src/{components,constants,hooks}/**/index.story.tsx'),
);

function addPath(fileLocations, acc) {
  const location = fileLocations.shift();

  let component = acc.find(item => item.name === location);

  if (!component) {
    component = { name: location };
    acc.push(component);
  }

  if (fileLocations.length) {
    addPath(fileLocations, component.children || (component.children = []));
  }

  return acc;
}

function exec() {
  // Stories
  // ----------------

  const importItems = TARGET_FILES.map(rawPath => {
    const path = rawPath.replace(/^\/.+\/learn-react\/packages/, '@learn-react').replace(/\/src|\.tsx/g, '');

    return {
      path,
      storyName: path.split('/').slice(-2)[0],
    };
  }).flat(2);

  const storyTree = Object.values(TARGET_FILES).reduce(
    (acc, path) => addPath(path.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, '').split('/'), acc),
    [],
  );

  // Story Spec
  // ----------------

  const storySpec = TARGET_FILES.reduce((acc, filePath) => {
    const key = filePath.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, '');
    const value = fs.readFileSync(filePath, 'utf-8');

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  // Generate
  // ----------------

  fs.writeFileSync('./src/constants/Stories.ts', storiesTemplate({ importItems, storyTree }), 'utf8');
  fs.writeFileSync('./src/constants/StorySpec.ts', storySpecTemplate(storySpec), 'utf8');
}

exec();

watch && chokidar.watch(TARGET_FILES).on('raw', exec);
