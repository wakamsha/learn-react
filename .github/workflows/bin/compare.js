// @ts-check

module.exports = async ({ github, context }) => {
  const {
    data: { artifacts },
  } = await github.rest.actions.listArtifactsForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });

  const optimizedArtifacts = artifacts
    .filter(({ name }) => name === 'fileSizeInfo')
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  console.log(JSON.stringify(optimizedArtifacts, null, 2));

  if (!optimizedArtifacts.length) return;

  const foo = await github.rest.actions.getArtifact({
    owner: context.repo.owner,
    repo: context.repo.repo,
    artifact_id: optimizedArtifacts[0].id,
  });

  console.info({ foo });
};
