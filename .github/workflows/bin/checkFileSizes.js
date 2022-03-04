// @ts-check
const { statSync } = require('fs');
const glob = require('glob');

const filePaths = glob.sync('./packages/catalog/dist/assets/{index,vendor}.*.js');

function generateLog(filePaths) {
  return filePaths.reduce((acc, filePath) => {
    const { size } = statSync(filePath);

    return {
      ...acc,
      [filePath.split('/').pop()]: generateFileSizeUnit(size),
    };
  }, {});
}

function generateFileSizeUnit(size) {
  // 1 KB = 1024 Byte
  const kb = 1024;
  const mb = kb ** 2;

  const round = (size, unit) => Math.round((size / unit) * 100.0) / 100.0;

  if (size >= mb) {
    return `${round(size, mb)}MB`;
  }
  if (size >= kb) {
    return `${round(size, kb)}KB`;
  }
  return `${size}Byte`;
}

module.exports = ({ github, context }) => {
  const body = generateLog(filePaths);

  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: JSON.stringify(body, null, 2),
  });
};
