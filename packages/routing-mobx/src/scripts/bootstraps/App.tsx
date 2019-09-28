import * as React from 'react';
import { HistoryStore } from '../stores/HistoryStore';
import { HomePage } from '../pages/Home';
import { Link, Route, Switch } from 'react-router-dom';
import { Profile } from '../pages/profiles/Profile';
import { Router } from '../Router';
import { observer } from 'mobx-react-lite';

type Props = {
  historyStore: HistoryStore;
};

const baseStyle = {
  display: 'flex',
  width: '100%',
};

const navStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 16,
  height: '100vh',
  borderLeft: '1px solid gray',
  background: 'silver',
  flexShrink: 0,
};

const contentStyle = {
  padding: 16,
  height: '100vh',
  flexGrow: 1,
};

export const App = observer(({ historyStore }: Props) => (
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
      <Switch location={historyStore.location}>
        <Route path={Router.paths.home} component={HomePage} exact />
        <Route component={Profile} />
      </Switch>
    </div>
  </div>
));
