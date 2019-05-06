import * as React from 'react';
import { Log } from './components/Log';
import { Stores } from './stores';

const JSONPlaceholderContext = React.createContext(Stores.jsonPlaceholderStore);

export const FetchUsers = () => (
  <JSONPlaceholderContext.Provider value={Stores.jsonPlaceholderStore}>
    <JSONPlaceholderContext.Consumer>{store => <Log store={store} />}</JSONPlaceholderContext.Consumer>
  </JSONPlaceholderContext.Provider>
);
