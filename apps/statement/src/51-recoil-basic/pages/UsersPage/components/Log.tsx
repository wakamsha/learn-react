import { css } from '@emotion/css';
import { FontFamily, LineHeight } from '@learn-react/core/src/constants/Style';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { Suspense } from 'react';
import { useData } from '../states/UsersState';

export const Log = () => {
  console.info('Log');

  // const { data } = useData();

  return (
    <figure className={styleBase}>
      <pre>
        <Suspense fallback="Now Loading...">
          <Presentation />
        </Suspense>
      </pre>
    </figure>
  );
};

const Presentation = () => {
  const { data } = useData();

  return <code>{JSON.stringify(data, null, 2)}</code>;
};

const styleBase = css`
  height: 100%;
  margin: 0;
  background-color: #0f192a;

  > pre {
    height: 100%;
    padding: ${gutter(4)};
    margin: 0;
    overflow: auto;
    color: #d1edff;

    > code {
      font-family: ${FontFamily.Monospace};
      font-size: 0.65rem;
      line-height: ${LineHeight.Compressed};
    }
  }
`;
