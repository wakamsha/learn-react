import { App } from './bootstraps/App';
import { Router } from 'react-router-dom';
import { Stores } from './stores';
import { observer } from 'mobx-react';
import React from 'react';

export const MobxBasicApp = observer(() => (
  <Router history={Stores.historyStore.history}>
    <App />
  </Router>
));
