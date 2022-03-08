// @ts-check
const { format } = require('date-fns');
const { statSync, writeFileSync } = require('fs');
const glob = require('glob');

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

  writeFileSync(
    exportPath,
    JSON.stringify(
      {
        ...fileSizeInfo,
        exportedAt: format(new Date(), 'yyyy.MM.dd HH:mm:ss'),
      },
      null,
      2,
    ),
    'utf8',
  );
};
