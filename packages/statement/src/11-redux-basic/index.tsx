import { Routing } from '../@core/components/Routing';
import { App } from './bootstraps/App';

export const ReduxBasicApp = () => (
  <Routing.Provider>
    <App />
  </Routing.Provider>
);
