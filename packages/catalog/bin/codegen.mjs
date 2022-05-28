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
const __dirname = dirname(new URL(import.meta.url).pathname);

const { watch } = yargs(hideBin(process.argv)).option('watch', {
  alias: 'w',
  type: 'boolean',
  describe: 'ターゲットファイルの変更を監視して自動的にコード生成を実行します。',
}).argv;

const targetFiles = glob.sync(resolve(__dirname, '../../**/dataDisplay/**/*.story.tsx'));

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

  const importPaths = targetFiles.map(rawPath => rawPath.replace(/^\/.+\/packages\/|\/src|\.story.tsx/g, '')).flat(2);

  const storyTreeMap = Object.values(targetFiles).reduce(
    (acc, path) => addPath(path.replace(/^\/.+\/packages\/|\/src|\/index|\.story.tsx/g, '').split('/'), acc),
    [],
  );

  // Story Spec
  // ----------------

  const storySpec = targetFiles.reduce((acc, filePath) => {
    const key = filePath.replace(/^\/.+\/packages\/|\/src|\/index.story.tsx/g, '');
    const value = readFileSync(filePath, 'utf-8');

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  // Generate
  // ----------------

  writeFileSync(resolve(__dirname, '../src/constants/Stories.ts'), storiesTemplate(importPaths, storyTreeMap), 'utf8');
  writeFileSync(resolve(__dirname, '../src/constants/StorySpec.ts'), storySpecTemplate(storySpec), 'utf8');
}

exec();

watch && chokidar.watch(targetFiles).on('raw', exec);
