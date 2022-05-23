// @ts-check
const { postComment } = require('./utils');

/**
 * マージ方式として選択可能な値。
 *
 * @typedef {typeof mergeModes[number]} MergeMode
 * @type {['commit', 'squash']}
 */
const mergeModes = ['commit', 'squash'];

/**
 * Approve された PR の適切なマージ方式を通知します。
 * 通知 GitHub コメントとして出力します。
 *
 * @typedef {object} Props
 * @property {*} github  octokit/rest.js クライアント
 * @property {*} context ワークフロー実行コンテキストを含むオブジェクト
 * @property {MergeMode} mergeMode マージ方式
 *
 * @param {Props} props
 */
module.exports.noticeHowToMerge = ({ github, context, mergeMode }) => {
  if (!mergeModes.includes(mergeMode)) {
    console.error('🙅‍♀️  param must be "commit" or "squash"');
    process.exit(1);
  }

  const message = `マージ方式: ${mergeMode === 'commit' ? '`Create a merge commit`' : '`Squash and merge`'}`;

  postComment({
    github,
    context,
    message,
    messagePattern: new RegExp(String.raw`^マージ方式:`),
  });
};
