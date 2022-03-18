// @ts-check
const { generateFileSizeInfo } = require('./utils');
const { existsSync } = require('fs');
const { resolve } = require('path');

/**
 * ヒルドした JavaScript ファイルサイズの差分情報を出力します。
 *
 * @typedef {{ files: { name: string; prev: number; current: number; diff: number; }[]; total: { prev: number; current: number; diff: number; } }} FileSizeDiff
 *
 * @param {string} targetPackage 対象のパッケージ名
 * @param {string} prevInfoFileName 比較元となる JSON ファイル名
 * @returns {FileSizeDiff} 差分情報オブジェクト
 *
 * @example
 * {
 *   files: [
 *     { name: '/app.js', prev: 1000, current: 1100, diff: 100 },
 *     { name: '/vendor/bundle.js', prev: 1100, current: 1000, diff: -100 },
 *   ],
 *   total: { prev: 2100, current: 2100, diff: 0 },
 * }
 */
module.exports.generateFileSizeDiff = (targetPackage, prevInfoFileName) => {
  const prevInfo = existsSync(prevInfoFileName) ? require(resolve(prevInfoFileName)) : { files: {}, total: 0 };

  const currentInfo = generateFileSizeInfo(targetPackage);

  const result = {
    files: Object.entries(currentInfo.files).map(([name, size]) => ({
      name,
      prev: prevInfo.files[name] ?? 0,
      current: size,
      diff: size - (prevInfo.files[name] ?? 0),
    })),
    total: {
      prev: prevInfo.total,
      current: currentInfo.total,
      diff: currentInfo.total - prevInfo.total,
    },
  };

  console.log(JSON.stringify(result, null, 2));

  return result;
};
