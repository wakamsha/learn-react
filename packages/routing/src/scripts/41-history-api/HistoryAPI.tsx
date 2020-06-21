import { About } from './pages/About';
import { HistoryContext, LocationContext, useHistory } from './hooks/useHistory';
import { Home } from './pages/Home';
import { Navigation } from './components/Navigation';
import { PageTransition } from './components/PageTransition';
import { Route, Router } from 'react-router-dom';
import { css } from 'emotion';
import React from 'react';

export const HistoryAPI = () => {
  const { history, location } = useHistory();

  return (
    <HistoryContext.Provider value={history}>
      <LocationContext.Provider value={location}>
        <Router history={history}>
          <div className={baseStyle}>
            <Navigation />
            <main className={contentStyle}>
              <PageTransition>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} />
              </PageTransition>
            </main>
          </div>
        </Router>
      </LocationContext.Provider>
    </HistoryContext.Provider>
  );
};

const baseStyle = css({
  display: 'flex',
  width: '100%',
});

const contentStyle = css({
  padding: 16,
  height: '100vh',
  flexGrow: 1,
});
