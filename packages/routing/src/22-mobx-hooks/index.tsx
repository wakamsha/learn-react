import { Router } from 'react-router-dom';
import { App } from './bootstraps/App';
import { Stores } from './stores';

export const MobxHooksApp = () => (
  <Router history={Stores.historyStore.history}>
    <App />
  </Router>
);
