import { App } from './bootstraps/App';
import { Router } from 'react-router-dom';
import { Stores } from './stores';
import React from 'react';

export const MobxHooksApp = () => (
  <Router history={Stores.historyStore.history}>
    <App />
  </Router>
);
