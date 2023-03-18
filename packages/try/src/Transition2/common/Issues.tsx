import { css } from '@emotion/css';
import { FontSize } from '@learn-react/core/constants/Style';
import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import useSWR from 'swr';

type IssueType = {
  id: number;
  title: string;
  html_url: string;
  user: {
    id: number;
    login: string;
    html_url: string;
  };
};

type Props = {
  page: number;
  suspense?: boolean;
};

export const Issues = ({ page, suspense = false }: Props) => {
  const { data: issues } = useSWR(
    ['facebook/react/issues', page],
    () => {
      const url = `https://api.github.com/repos/facebook/react/issues?per_page=10&state=all&page=${page}`;

      return fetch(url).then<IssueType[]>((result) => result.json());
    },
    {
      suspense,
    },
  );

  return (
    <ul className={styleIssues}>
      {issues?.map((issue) => (
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
