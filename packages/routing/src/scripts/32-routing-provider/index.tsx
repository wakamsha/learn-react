import { App } from './bootstraps/App';
import { RoutingProvider } from '../@core/components/RoutingProvider';
import React from 'react';

export const RoutingProviderApp = () => (
  <RoutingProvider>
    <App />
  </RoutingProvider>
);
