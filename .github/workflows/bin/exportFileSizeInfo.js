// @ts-check
const { writeFileSync } = require('fs');
const { generateFileSizeInfo } = require('./utils');

/**
 * ビルドした JavaScript ファイルのサイズ情報を JSON 形式で出力します。
 *
 * @param {string} targetPackage 対象のパッケージ名
 * @param {string} exportPath 出力先
 */
module.exports = (targetPackage, exportPath) => {
  const fileSizeInfo = generateFileSizeInfo(targetPackage);

  // ファイルのサイズ情報を JSON 形式で出力します。
  writeFileSync(exportPath, JSON.stringify(fileSizeInfo, null, 2), 'utf8');
  console.info({ fileSizeInfo });
};
