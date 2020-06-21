import { AboutPage } from '../pages/About';
import { HistoryStore } from '../stores/HistoryStore';
import { HomePage } from '../pages/Home';
import { Navigation } from '../components/Navigation';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageTransition } from '../components/PageTransition';
import { Profile } from '../pages/profiles';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { Stores } from '../stores';
import { css } from 'emotion';
import React from 'react';

export const App = () => (
  <HistoryStore.Context.Provider value={Stores.historyStore}>
    <div className={baseStyle}>
      <Navigation />
      <div className={contentStyle}>
        <PageTransition>
          <Route path={Router.Paths.Home} component={HomePage} exact />
          <Route path={Router.Paths.About} component={AboutPage} />
          <Route path={Router.Paths.Profile} component={Profile} />
          <Route component={NotFoundPage} />
        </PageTransition>
      </div>
    </div>
  </HistoryStore.Context.Provider>
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
