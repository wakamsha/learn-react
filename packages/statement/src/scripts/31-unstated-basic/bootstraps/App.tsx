import { HomePage } from '../pages/HomePage';
import { ListPage } from '../pages/profiles/ListPage';
import { Navigation } from '../components/Navigation';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageTransition } from '../../@core/components/PageTransition';
import { ProfilePage } from '../pages/profiles';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { css } from 'emotion';
import React from 'react';

export const App = () => (
  <div className={baseStyle}>
    <Navigation />
    <div className={contentStyle}>
      <PageTransition>
        <Route path={Router.paths.home} component={HomePage} exact />
        <Route path={Router.paths.profile} component={ProfilePage} />
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
