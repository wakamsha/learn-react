import { App } from './bootstraps/App';
import { Router } from 'react-router-dom';
import { Stores } from './stores';
import { render } from 'react-dom';
import { useObserver } from 'mobx-react';
import React from 'react';

const Bootstrap = () => {
  const history = useObserver(() => Stores.historyStore.history);

  return (
    <Router history={history}>
      <App />
    </Router>
  );
};

render(<Bootstrap />, document.getElementById('app'));
