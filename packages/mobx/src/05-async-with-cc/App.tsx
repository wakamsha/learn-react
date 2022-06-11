import { css } from '@emotion/css';
import { GetForm } from './components/GetForm';
import { GetWithParamForm } from './components/GetWithParamForm';
import { Log } from './components/Log';
import { PostForm } from './components/PostForm';
import { Stores } from './stores';
import { UsersStore } from './stores/UserStore';

export const AsyncWithCC = () => (
  <UsersStore.Context.Provider value={Stores.userStore}>
    <div className={baseStyle}>
      <div className={formColumnStyle}>
        <h1>(05) Async w/ CC</h1>
        <UsersStore.Context.Consumer>{store => (store ? <GetForm store={store} /> : null)}</UsersStore.Context.Consumer>
        <hr />
        <UsersStore.Context.Consumer>
          {store => (store ? <GetWithParamForm store={store} /> : null)}
        </UsersStore.Context.Consumer>
        <hr />
        <UsersStore.Context.Consumer>
          {store => (store ? <PostForm store={store} /> : null)}
        </UsersStore.Context.Consumer>
      </div>
      <div className={logColumnStyle}>
        <Log />
      </div>
    </div>
  </UsersStore.Context.Provider>
);

const baseStyle = css`
  display: flex;
  height: 100vh;
`;

const formColumnStyle = css`
  flex: 1 1 100%;
  padding: 0 16px;
`;

const logColumnStyle = css`
  flex: 1.618 1 100%;
`;
