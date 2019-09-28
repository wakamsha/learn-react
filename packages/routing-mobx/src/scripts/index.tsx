import * as React from 'react';
import { HomePage } from './pages/Home';
import { Link } from 'react-router-dom';
import { Profile } from './pages/profiles/Profile';
import { Router as ReactRouter, Route, Switch } from 'react-router';
import { Router } from './Router';
import { Stores } from './stores';
import { observer } from 'mobx-react-lite';
import { render } from 'react-dom';

const baseStyle = {
  display: 'flex',
  width: '100%',
};

const navStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 16,
  flexShrink: 0,
  background: 'black',
  height: '100vh',
  color: 'white',
};

const contentStyle = {
  flexGrow: 1,
  height: '100vh',
  background: 'pink',
};

const App = observer(() => (
  <ReactRouter history={Stores.historyStore.history}>
    <div style={baseStyle}>
      <ul style={navStyle}>
        <li>
          <Link to={Router.paths.home}>Home</Link>
        </li>
        <li>
          Profile
          <ul>
            <li>
              <Link to={Router.paths.profileShow}>Show</Link>
            </li>
            <li>
              <Link to={Router.paths.profileEdit}>Edit</Link>
            </li>
          </ul>
        </li>
      </ul>
      <div style={contentStyle}>
        <Switch location={Stores.historyStore.location}>
          <Route path={Router.paths.home} component={HomePage} exact />
          <Route component={Profile} />
        </Switch>
      </div>
    </div>
  </ReactRouter>
));

render(<App />, document.getElementById('app'));
