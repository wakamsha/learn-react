// @ts-check
import { statSync } from 'fs';
import glob from 'glob';
// import { dirname, resolve } from 'path';

// @ts-ignore
// const __dirname = dirname(new URL(import.meta.url).pathname);

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

// writeFileSync('./dist/fileSizes.json', JSON.stringify(generateLog(filePaths), null, 2), 'utf8');

export function exec({ github, context }) {
  const body = generateLog(filePaths);

  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: JSON.stringify(body, null, 2),
  });
}
