import { css } from '@emotion/css';
import { useMemo } from 'react';
import { GetByParamForm } from './components/GetByParamForm';
import { GetForm } from './components/GetForm';
import { Log } from './components/Log';
import { PostForm } from './components/PostForm';
import { UsersStore } from './stores/UsersStore';

export const AsyncWithFC = () => {
  const usersStore = useMemo(() => new UsersStore(), []);

  return (
    <UsersStore.Context.Provider value={usersStore}>
      <div className={baseStyle}>
        <div className={formColumnStyle}>
          <h1>Async w/ FC</h1>
          <GetForm />
          <hr />
          <GetByParamForm />
          <hr />
          <PostForm />
        </div>
        <div className={logColumnStyle}>
          <Log />
        </div>
      </div>
    </UsersStore.Context.Provider>
  );
};

const baseStyle = css({
  display: 'flex',
  height: '100vh',
});

const formColumnStyle = css({
  padding: '0 16px',
  flex: '1 1 100%',
});

const logColumnStyle = css({
  flex: '1.618 1 100%',
});
