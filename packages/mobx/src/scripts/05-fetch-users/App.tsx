import * as React from 'react';
import { GetForm } from './components/GetForm';
import { Log } from './components/Log';
import { Stores } from './stores';
import { css } from 'emotion';

const baseStyle = css({
  display: 'flex',
});

const formColumnStyle = css({
  padding: '0 16px',
  flexShrink: 0,
});

const logColumnStyle = css({
  flexGrow: 1,
});

const JSONPlaceholderContext = React.createContext(Stores.jsonPlaceholderStore);

export const FetchUsers = () => (
  <JSONPlaceholderContext.Provider value={Stores.jsonPlaceholderStore}>
    <div className={baseStyle}>
      <div className={formColumnStyle}>
        <JSONPlaceholderContext.Consumer>{store => <GetForm store={store} />}</JSONPlaceholderContext.Consumer>
      </div>
      <div className={logColumnStyle}>
        <JSONPlaceholderContext.Consumer>{store => <Log store={store} />}</JSONPlaceholderContext.Consumer>
      </div>
    </div>
  </JSONPlaceholderContext.Provider>
);
