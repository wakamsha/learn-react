import { css } from '@emotion/css';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { Suspense } from 'react';
import { fetchIssues, useData, type IssueType } from './common/Api';
import { usePageNumberV2 } from './common/usePageNumber';

/**
 * useSWR の代わりに `useData` + `Loadable` を用いて `3_WithTransition` を再実装した例。
 */
export const Story = () => {
  const { page, isPending, incrementPage, decrementPage } = usePageNumberV2();

  return (
    <div className={styleBase}>
      <div>
        <button disabled={isPending} onClick={decrementPage}>
          前へ
        </button>
        <button disabled={isPending} onClick={incrementPage}>
          次へ
        </button>
        {isPending ? <span className={styleIndicator}>Loading...</span> : null}
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Presentation page={page} />
      </Suspense>
    </div>
  );
};

const styleBase = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;

const styleIndicator = css`
  font-weight: bold;
  color: ${cssVar('ThemeDangerNeutral')};
`;

const Presentation = ({ page }: { page: number }) => {
  const issues = useData(`issues:${page}`, fetchIssues, page);

  return (
    <ul className={styleIssues}>
      {issues.map((issue) => (
        <li key={issue.id}>
          <Issue issue={issue} />
        </li>
      ))}
    </ul>
  );
};

const styleIssues = css`
  > :not(:first-child) {
    margin-top: ${gutter(2)};
  }
`;

type IssueProps = {
  issue: IssueType;
};

const Issue = ({ issue }: IssueProps) => (
  <article className={styleCard}>
    <h1>
      <a href={issue.html_url} target="__blank">
        {issue.title}
      </a>
    </h1>

    <p>
      Opened by{' '}
      <a href={issue.user.html_url} target="__blank">
        {issue.user.login}
      </a>
    </p>
  </article>
);

const styleCard = css`
  padding: ${gutter(4)};
  font-size: ${FontSize.Regular};
  background-color: ${cssVar('TexturePaper')};
  box-shadow: ${cssVar('ShadowNeutral')};
`;
