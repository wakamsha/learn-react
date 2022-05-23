// @ts-check

/**
 * 現在の GHA ワークフロー・コンテキストに対してコメントを投稿します。
 * 例えば Pull Request によるワークフローならば、その PR に対してコメントを投稿します。
 * 既に同一種類のコメントが存在する場合は、それを更新します。
 *
 * @typedef {object} CommentProps
 * @property {string} message コメント本文
 * @property {RegExp} messagePattern コメント本文の正規表現パターン。同一種類のコメントが既に投稿済みかを捜査するのに使う。
 * @property {*} github  octokit/rest.js クライアント
 * @property {*} context ワークフロー実行コンテキストを含むオブジェクト
 *
 * @param {CommentProps} props
 */
module.exports.postComment = async ({ message, messagePattern, github, context }) => {
  const { data: comments } = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  // 同一種類のコメントを探す。
  const pastComment = comments.find(
    ({ user, body }) => user.login === 'github-actions[bot]' && messagePattern.test(body),
  );

  // 既に投稿済みであればそれを更新し、無ければ新規に投稿する。
  if (pastComment) {
    github.rest.issues.updateComment({
      comment_id: pastComment.id,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: message,
    });
  } else {
    github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: message,
    });
  }
};
