import { About } from '../pages/About';
import { Home } from '../pages/Home';
import { Navigation } from '../components/Navigation';
import { PageTransition } from '../components/PageTransition';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { css } from 'emotion';
import React from 'react';

export const App = () => (
  <div className={baseStyle}>
    <Navigation />
    <main className={contentStyle}>
      <PageTransition>
        <Route path={Router.Paths.Home} component={Home} exact />
        <Route path={Router.Paths.About} component={About} />
      </PageTransition>
    </main>
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
