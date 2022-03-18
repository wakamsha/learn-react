// @ts-check
const { statSync } = require('fs');
const glob = require('glob');

/**
 * ビルドした JavaScript ファイルのサイズ情報を生成します。
 *
 * @param {string} targetPackage 対象のパッケージ名
 * @returns {{ files: { [filePath: string]: number }, total: number }} ファイルサイズオブジェクト
 *
 * @example
 * generateFileSizeInfo('app');
 * // {
 * //   files: {
 * //     '/app.js': 602437,
 * //     '/vendor/bundle.js': 1025138,
 * //   },
 * //   total: 1627575
 * // }
 */
module.exports.generateFileSizeInfo = targetPackage => {
  const filePaths = glob.sync(`./packages/${targetPackage}/dist/assets/**/*.js`);

  const fileSizeInfo = filePaths.reduce(
    (acc, filePath) => {
      const fileSize = statSync(filePath).size;

      return {
        ...acc,
        files: {
          ...acc.files,
          [filePath.replace(/^\.+\S+assets/g, '').replace(/\.(?!worker)(\w+)\.js/, '.js')]: fileSize,
        },
        total: acc.total + fileSize,
      };
    },
    { files: {}, total: 0 },
  );

  return fileSizeInfo;
};

/**
 * Bytes 値を適切なサイズ単位表記に変換します。
 *
 * @param {number} bytes 変換する bytes 値
 * @returns {string} 変換後の表記
 *
 * @example
 * bytesToSize(1234567); // 1.2MB
 * bytesToSize(-1234567); // -1.2MB
 */
module.exports.bytesToSize = bytes => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return 'n/a';

  const i = parseInt(`${Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024))}`, 10);

  if (i === 0) return `${bytes} ${sizes[i]}`;

  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};
