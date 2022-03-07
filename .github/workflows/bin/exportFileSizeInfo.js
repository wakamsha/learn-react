// @ts-check
const { statSync, writeFileSync } = require('fs');
const glob = require('glob');
const { resolve } = require('path');

/**
 * ビルドした JavaScript ファイルのサイズ情報を JSON 形式で出力します。
 */
module.exports = ({ exportPath, targetPathPattern }) => {
  const filePaths = glob.sync(targetPathPattern);

  const fileSizeInfo = filePaths.reduce(
    (acc, filePath) => ({
      ...acc,
      [filePath.split('/').pop()]: statSync(filePath).size,
    }),
    {},
  );

  writeFileSync(exportPath, JSON.stringify(fileSizeInfo, null, 2), 'utf8');
};
