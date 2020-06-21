import { App } from './bootstraps/App';
import { RoutingProvider } from './components/RoutingProvider';
import React from 'react';

export const RoutingProviderApp = () => (
  <RoutingProvider>
    <App />
  </RoutingProvider>
);
