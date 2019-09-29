import * as React from 'react';
import { HistoryStore } from '../stores/HistoryStore';
import { HomePage } from '../pages/Home';
import { Link, Route } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageTransition } from '../components/PageTransition';
import { Profile } from '../pages/profiles/Profile';
import { Router } from '../Router';
import { css } from 'emotion';
import { observer } from 'mobx-react-lite';

type Props = {
  historyStore: HistoryStore;
};

const baseStyle = css({
  display: 'flex',
  width: '100%',
});

const navStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 16,
  height: '100vh',
  borderLeft: '1px solid gray',
  background: 'silver',
  flexShrink: 0,
  li: {
    marginBottom: 8,
  },
});

const contentStyle = css({
  padding: 16,
  height: '100vh',
  flexGrow: 1,
});

export const App = observer(({ historyStore }: Props) => (
  <div className={baseStyle}>
    <ul className={navStyle}>
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
    <div className={contentStyle}>
      <PageTransition historyStore={historyStore}>
        <Route path={Router.paths.home} component={HomePage} exact />
        <Route path={Router.paths.profile} component={Profile} />
        <Route component={NotFoundPage} />
      </PageTransition>
    </div>
  </div>
));
