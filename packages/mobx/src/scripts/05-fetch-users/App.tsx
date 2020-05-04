import { GetForm } from './components/GetForm';
import { GetWithParamForm } from './components/GetWithParamForm';
import { Log } from './components/Log';
import { PostForm } from './components/PostForm';
import { Stores } from './stores';
import { css } from 'emotion';
import React from 'react';

const baseStyle = css({
  display: 'flex',
});

const formColumnStyle = css({
  padding: '0 16px',
  flexShrink: 0,
  flexGrow: 1,
});

const logColumnStyle = css({
  flexGrow: 1.618,
});

const JSONPlaceholderContext = React.createContext(Stores.jsonPlaceholderStore);

export const FetchUsers = () => (
  <JSONPlaceholderContext.Provider value={Stores.jsonPlaceholderStore}>
    <div className={baseStyle}>
      <div className={formColumnStyle}>
        <JSONPlaceholderContext.Consumer>{store => <GetForm store={store} />}</JSONPlaceholderContext.Consumer>
        <hr />
        <JSONPlaceholderContext.Consumer>{store => <GetWithParamForm store={store} />}</JSONPlaceholderContext.Consumer>
        <hr />
        <JSONPlaceholderContext.Consumer>{store => <PostForm store={store} />}</JSONPlaceholderContext.Consumer>
      </div>
      <div className={logColumnStyle}>
        <JSONPlaceholderContext.Consumer>{store => <Log store={store} />}</JSONPlaceholderContext.Consumer>
      </div>
    </div>
  </JSONPlaceholderContext.Provider>
);
