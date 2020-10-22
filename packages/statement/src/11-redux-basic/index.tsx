import { App } from './bootstraps/App';
import { Routing } from '../@core/components/Routing';
import React from 'react';

export const ReduxBasicApp = () => (
  <Routing.Provider>
    <App />
  </Routing.Provider>
);
