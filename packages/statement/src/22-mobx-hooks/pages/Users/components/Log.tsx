import { LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import { observer } from 'mobx-react';
import { UsersStore } from '../stores/UsersStore';

export const Log = observer(() => {
  console.info('Log');

  const store = UsersStore.useStore();

  return (
    <figure className={styleBase}>
      <pre>
        <code>{JSON.stringify(store.users, null, 2)}</code>
      </pre>
    </figure>
  );
});

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
