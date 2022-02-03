/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-check
import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import { dirname, resolve } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { template as storiesTemplate } from '../templates/stories.mjs';
import { template as storySpecTemplate } from '../templates/storySpec.mjs';

// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(new URL(import.meta.url).pathname);

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

  const importPaths = TARGET_FILES.map(rawPath =>
    rawPath.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, ''),
  ).flat(2);

  const storyTree = Object.values(TARGET_FILES).reduce(
    (acc, path) => addPath(path.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, '').split('/'), acc),
    [],
  );

  // Story Spec
  // ----------------

  const storySpec = TARGET_FILES.reduce((acc, filePath) => {
    const key = filePath.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, '');
    const value = readFileSync(filePath, 'utf-8');

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  // Generate
  // ----------------

  writeFileSync('./src/constants/Stories.ts', storiesTemplate({ importPaths, storyTree }), 'utf8');
  writeFileSync('./src/constants/StorySpec.ts', storySpecTemplate(storySpec), 'utf8');
}

exec();

watch && chokidar.watch(TARGET_FILES).on('raw', exec);
