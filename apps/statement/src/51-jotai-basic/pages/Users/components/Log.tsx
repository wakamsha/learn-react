import { css } from '@emotion/css';
import { LineHeight } from '@learn-react/core/src/constants/Style';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useAtomValue } from 'jotai';
import { usersAtom } from '../../../atoms/usersAtom';

export const Log = () => {
  console.info('Log');

  const users = useAtomValue(usersAtom);

  return (
    <figure className={styleBase}>
      <pre>
        <code>{JSON.stringify(users, null, 2)}</code>
      </pre>
    </figure>
  );
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
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
      font-size: 0.65rem;
      line-height: ${LineHeight.Compressed};
    }
  }
`;
