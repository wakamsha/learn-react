import { RoutingProvider } from '../@core/components/RoutingProvider';
import { App } from './bootstraps/App';

export const RoutingProviderApp = () => (
  <RoutingProvider>
    <App />
  </RoutingProvider>
);
