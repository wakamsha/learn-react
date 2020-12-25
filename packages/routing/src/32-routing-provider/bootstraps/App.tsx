import { css } from '@emotion/css';
import { Navigation } from '@learn-react/core/components/Navigation';
import { PageTransition } from '@learn-react/core/components/PageTransition';
import { gutter } from '@learn-react/core/helpers/Style';

import { ComponentProps } from 'react';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { About } from '../pages/About';
import { Beatles } from '../pages/Beatles';
import { Home } from '../pages/Home';

export const App = () => (
  <div className={baseStyle}>
    <Navigation title="Routing Provider" items={linkItems} />
    <main className={contentStyle}>
      <PageTransition>
        <Route path={Router.Paths.Home} component={Home} exact />
        <Route path={Router.Paths.About} component={About} />
        <Route path={Router.Paths.Beatles} component={Beatles} />
      </PageTransition>
    </main>
  </div>
);

const linkItems: ComponentProps<typeof Navigation>['items'] = [
  {
    label: 'Home',
    to: Router.Paths.Home,
  },
  {
    label: 'About',
    to: Router.Paths.About,
  },
  {
    label: 'The Beatles',
    to: Router.Paths.Beatles,
  },
];

const baseStyle = css`
  display: flex;
  width: 100%;
`;

const contentStyle = css`
  flex-grow: 1;
  height: 100vh;
  padding: ${gutter(4)};
`;
