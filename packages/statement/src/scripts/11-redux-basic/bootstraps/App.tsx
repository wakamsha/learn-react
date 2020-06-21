import { HomePage } from '../pages/Home';
import { ListPage } from '../pages/ListPage';
import { Navigation } from '../components/Navigation';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProfileEditPage } from '../pages/profiles/EditPage';
import { ProfileShowPage } from '../pages/profiles/ShowPage';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Router } from '../constants/Router';
import { css } from 'emotion';
import { store } from '../stores/store';
import React from 'react';

export const App = () => (
  <Provider store={store}>
    <div className={baseStyle}>
      <Navigation />
      <div className={contentStyle}>
        <Switch>
          <Route path={Router.paths.home} component={HomePage} exact />
          <Route path={Router.paths.profileShow} component={ProfileShowPage} />
          <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
          <Route path={Router.paths.list} component={ListPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </Provider>
);

const baseStyle = css({
  display: 'flex',
  width: '100%',
});

const contentStyle = css({
  padding: 16,
  height: '100vh',
  flexGrow: 1,
});
