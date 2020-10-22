import { UsersStore } from '../stores/UsersStore';
import { css } from 'emotion';
import { useContext } from '@learn-react/core/hooks/useContext';
import { useObserver } from 'mobx-react';
import React from 'react';

export const Log = () => {
  const store = useContext(UsersStore.Context);

  const { users } = useObserver(() => ({ users: store.users }));

  return (
    <figure className={baseStyle}>
      <pre>
        <code>{JSON.stringify({ ...users }, null, 2)}</code>
      </pre>
    </figure>
  );
};

const baseStyle = css({
  margin: 0,
  background: '#0f192a',
  height: '100%',
  '> pre': {
    height: '100%',
    padding: 16,
    margin: 0,
    overflow: 'auto',
    color: '#d1edff',
    '> code': {
      fontFamily: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace',
      fontSize: '0.65rem',
      lineHeight: 1.3,
    },
  },
});
