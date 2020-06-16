import { About } from '../pages/About';
import { Friends } from '../pages/Friends';
import { Home } from '../pages/Home';
import { Navigation } from '../components/Navigation';
import { PageTransition } from '../components/PageTransition';
import { Route } from 'react-router-dom';
import { Router } from '../constants/Router';
import { css } from 'emotion';
import React, { memo } from 'react';

export const App = () => (
  <div className={baseStyle}>
    <NavigationMemo />
    <main className={contentStyle}>
      <PageTransition>
        <Route path={Router.Paths.Home} component={Home} exact />
        <Route path={Router.Paths.About} component={About} />
        <Route path={Router.Paths.Friends} component={Friends} />
      </PageTransition>
    </main>
  </div>
);

const NavigationMemo = memo(Navigation);

const baseStyle = css({
  display: 'flex',
  width: '100%',
});

const contentStyle = css({
  padding: 16,
  height: '100vh',
  flexGrow: 1,
});
