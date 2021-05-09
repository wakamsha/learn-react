import fs from 'fs';
import { resolve, dirname as _dirname } from 'path';
import chokidar from 'chokidar';
import ejs from 'ejs';
import glob from 'glob';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const dirname = _dirname(new URL(import.meta.url).pathname);

const { watch } = yargs(hideBin(process.argv)).option('watch', {
  alias: 'w',
  type: 'boolean',
  describe: 'ターゲットファイルの変更を監視して自動的にコード生成を実行します。',
}).argv;

const TARGET_FILES = glob.sync(
  resolve(dirname, '../../{core,catalog}/src/{components,constants,hooks}/**/index.story.tsx'),
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

  ejs.renderFile('./templates/stories.ejs', { importItems, storyTree }, (_, output) => {
    fs.writeFileSync('./src/constants/Stories.ts', output, 'utf8');
  });

  ejs.renderFile('./templates/storySpec.ejs', { storySpec }, (_, output) => {
    fs.writeFileSync('./src/constants/StorySpec.ts', output, 'utf8');
  });
}

exec();

watch && chokidar.watch(TARGET_FILES).on('raw', exec);
