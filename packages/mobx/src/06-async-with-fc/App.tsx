import { css } from '@emotion/css';
import { configure } from 'mobx';
import { useRef } from 'react';
import { GetByParamForm } from './components/GetByParamForm';
import { GetForm } from './components/GetForm';
import { Log } from './components/Log';
import { PostForm } from './components/PostForm';
import { UsersStore } from './stores/UsersStore';

export const AsyncWithFC = () => {
  const usersStore = useRef(new UsersStore());

  return (
    <UsersStore.Context.Provider value={usersStore.current}>
      <div className={styleBase}>
        <div className={styleFormColumn}>
          <h1>(06) Async w/ FC</h1>
          <GetForm />
          <hr />
          <GetByParamForm />
          <hr />
          <PostForm />
        </div>
        <div className={styleLogColumn}>
          <Log />
        </div>
      </div>
    </UsersStore.Context.Provider>
  );
};

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

const styleBase = css`
  display: flex;
  height: 100vh;
`;

const styleFormColumn = css`
  flex: 1 1 100%;
  padding: 0 16px;

  > :not(:first-child) {
    margin-top: 24px;
  }
`;

const styleLogColumn = css`
  flex: 1.618 1 100%;
`;
