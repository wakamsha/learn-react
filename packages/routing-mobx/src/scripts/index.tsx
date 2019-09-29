import * as React from 'react';
import { App } from './bootstraps/App';
import { Router } from 'react-router-dom';
import { Stores } from './stores';
import { observer } from 'mobx-react-lite';
import { render } from 'react-dom';

const Bootstrap = observer(() => (
  <Router history={Stores.historyStore.history}>
    <App historyStore={Stores.historyStore} />
  </Router>
));

render(<Bootstrap />, document.getElementById('app'));
