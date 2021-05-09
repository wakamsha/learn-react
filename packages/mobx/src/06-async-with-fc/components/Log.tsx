import { css } from '@emotion/css';
import { useContext } from '@learn-react/core/hooks/useContext';
import { observer } from 'mobx-react';
import { UsersStore } from '../stores/UsersStore';

export const Log = observer(() => {
  const store = useContext(UsersStore.Context);

  return (
    <figure className={baseStyle}>
      <pre>
        <code>{JSON.stringify(store.users, null, 2)}</code>
      </pre>
    </figure>
  );
});

const baseStyle = css`
  height: 100%;
  margin: 0;
  background-color: #0f192a;

  > pre {
    height: 100%;
    padding: 16px;
    margin: 0;
    overflow: auto;
    color: #d1edff;

    > code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
      font-size: 0.65rem;
      line-height: 1.3;
    }
  }
`;
