// @ts-nocheck
import { watch } from 'chokidar';
import { glob } from 'glob';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { template as storiesTemplate } from '../templates/stories.js';

const __dirname = dirname(new URL(import.meta.url).pathname);

const { watch: watchFlag } = await yargs(hideBin(process.argv))
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

/**
 * ファイルの階層情報を元にツリー構造を作成します。
 *
 * @param {string} filePath - ファイルのパス
 * @param {string[]} fileLocations - ファイルの階層情報
 * @param {any[]} acc - 累積結果の配列
 *
 * @returns {any[]} ツリー構造を表す配列
 */
function addTree(filePath, fileLocations, acc) {
  const [location, ...restLocations] = fileLocations;

  let component = acc.find((item) => item.name === location);

  if (!component) {
    component = {
      name: location,
      ...(restLocations.length === 0 ? { sourceCode: readFileSync(filePath, 'utf8') } : {}),
    };
    acc.push(component);
  }

  if (restLocations.length > 0) {
    addTree(filePath, restLocations, component.children || (component.children = []));
  }

  return acc;
}

function exec() {
  const importPaths = sortedTargetFiles
    .map((rawPath) => rawPath.replaceAll(/^\/.+\/packages\/|\.story.tsx/g, ''))
    // oxlint-disable-next-line no-magic-array-flat-depth
    .flat(2);

  const storyTreeMap = sortedTargetFiles.reduce(
    (acc, path) => addTree(path, path.replaceAll(/^\/.+\/packages\/|\.story.tsx/g, '').split('/'), acc),
    [],
  );

  writeFileSync(resolve(__dirname, '../src/constants/Stories.ts'), storiesTemplate(importPaths, storyTreeMap), 'utf8');
}

exec();

watchFlag && watch(sortedTargetFiles).on('raw', exec);
