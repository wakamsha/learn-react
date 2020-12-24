import { Routing } from '../@core/components/Routing';
import { App } from './bootstraps/App';

export const UnstatedBasicApp = () => (
  <Routing.Provider>
    <App />
  </Routing.Provider>
);
