// @ts-check
import chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { dirname, resolve } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { template as storiesTemplate } from '../templates/stories.js';

const __dirname = dirname(new URL(import.meta.url).pathname);

const { watch } = await yargs(hideBin(process.argv))
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    describe: 'ターゲットファイルの変更を監視して自動的にコード生成を実行します。',
  })
  .parseAsync();

const targetFiles = await glob(resolve(__dirname, '../../../**/*.story.tsx'), { ignore: 'node_modules/**' });
const sortedTargetFiles = targetFiles.sort((a, b) => {
  const nameA = a.toLowerCase();
  const nameB = b.toLowerCase();
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
});

function addTree(filePath, fileLocations, acc) {
  const [location, ...restLocations] = fileLocations;

  let component = acc.find((item) => item.name === location);

  if (!component) {
    component = { name: location, ...(!restLocations.length ? { sourceCode: readFileSync(filePath, 'utf-8') } : {}) };
    acc.push(component);
  }

  if (restLocations.length) {
    addTree(filePath, restLocations, component.children || (component.children = []));
  }

  return acc;
}

function exec() {
  const importPaths = sortedTargetFiles.map((rawPath) => rawPath.replace(/^\/.+\/packages\/|\.story.tsx/g, '')).flat(2);

  const storyTreeMap = sortedTargetFiles.reduce(
    (acc, path) => addTree(path, path.replace(/^\/.+\/packages\/|\.story.tsx/g, '').split('/'), acc),
    [],
  );

  writeFileSync(resolve(__dirname, '../src/constants/Stories.ts'), storiesTemplate(importPaths, storyTreeMap), 'utf8');
}

exec();

watch && chokidar.watch(sortedTargetFiles).on('raw', exec);
