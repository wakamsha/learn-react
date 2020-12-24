import { observer } from 'mobx-react';
import { Router } from 'react-router-dom';
import { App } from './bootstraps/App';
import { Stores } from './stores';

export const MobxBasicApp = observer(() => (
  <Router history={Stores.historyStore.history}>
    <App />
  </Router>
));
