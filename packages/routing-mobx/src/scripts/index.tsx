import { App } from './bootstraps/App';
import { Router } from 'react-router-dom';
import { Stores } from './stores';
import { observer } from 'mobx-react';
import { render } from 'react-dom';
import React from 'react';

const Bootstrap = observer(() => (
  <Router history={Stores.historyStore.history}>
    <App historyStore={Stores.historyStore} />
  </Router>
));

render(<Bootstrap />, document.getElementById('app'));
