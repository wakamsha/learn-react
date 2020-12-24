import { PageTransition } from '@learn-react/core/components/PageTransition';
import { css } from 'emotion';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { Navigation } from '../components/Navigation';
import { AboutPage } from '../pages/About';
import { HomePage } from '../pages/Home';
import { NotFoundPage } from '../pages/NotFoundPage';

export const App = () => (
  <div className={baseStyle}>
    <Navigation />
    <div className={contentStyle}>
      <PageTransition>
        <Route path={Router.Paths.Home} component={HomePage} exact />
        <Route path={Router.Paths.About} component={AboutPage} />
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
