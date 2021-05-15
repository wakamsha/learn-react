import { Routing } from '../@core/components/Routing';
import { App } from './bootstraps/App';

export const ConstateBasicApp = () => (
  <Routing.Provider>
    <App />
  </Routing.Provider>
);
