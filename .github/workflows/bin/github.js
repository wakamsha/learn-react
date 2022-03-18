// @ts-check

/**
 * 現在の GHA ワークフロー・コンテキストに対してコメントを投稿します。
 * 例えば Pull Request によるワークフローならば、その PR に対してコメントを投稿します。
 *
 * @see https://github.com/actions/github-script#actionsgithub-script
 *
 * @param {string} commentBody コメント本文
 * @param {*} github  octokit/rest.js クライアント
 * @param {*} context ワークフロー実行コンテキストを含むオブジェクト
 */
module.exports.createComment = (commentBody, github, context) => {
  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentBody,
  });
};

module.exports.getComments = async (github, context) => {
  const comments = await github.rest.issues.listComments({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  console.log(JSON.stringify(comments, null, 2));
};
