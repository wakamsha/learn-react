import { HomePage } from '../pages/Home';
import { ListPage } from '../pages/ListPage';
import { Navigation } from '../components/Navigation';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageTransition } from '../components/PageTransition';
import { Profile } from '../pages/profiles/Profile';
import { Route } from 'react-router-dom';
import { Router } from '../constants/Router';
import { Stores } from '../stores';
import { css } from 'emotion';
import React from 'react';

export const App = () => (
  <div className={baseStyle}>
    <Navigation />
    <div className={contentStyle}>
      <PageTransition historyStore={Stores.historyStore}>
        <Route path={Router.paths.home} component={HomePage} exact />
        <Route path={Router.paths.profile} component={Profile} />
        <Route path={Router.paths.list} component={ListPage} />
        <Route component={NotFoundPage} />
      </PageTransition>
    </div>
  </div>
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
