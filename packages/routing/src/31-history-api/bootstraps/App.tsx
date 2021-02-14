import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';

import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { Navigation } from '../components/Navigation';
import { About } from '../pages/About';
import { Home } from '../pages/Home';

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
