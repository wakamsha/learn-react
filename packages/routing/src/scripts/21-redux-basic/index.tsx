import { App } from './bootstraps/App';
import { RoutingProvider } from './components/RoutingProvider';
import React from 'react';

export const ReduxBasicApp = () => (
  <RoutingProvider>
    <App />
  </RoutingProvider>
);
