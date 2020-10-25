import { HomePage } from '../pages/Home';
import { ListPage } from '../pages/ListPage';
import { Navigation } from '@learn-react/core/components/Navigation';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageTransition } from '../components/PageTransition';
import { Profile } from '../pages/profiles';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { Stores } from '../stores';
import { css } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
import React, { ComponentProps } from 'react';

export const App = () => (
  <div className={baseStyle}>
    <Navigation title="MobX Basic" items={linkItems} />
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

const linkItems: ComponentProps<typeof Navigation>['items'] = [
  {
    label: 'Home',
    to: Router.paths.home,
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Edit',
        to: Router.paths.profileEdit,
      },
      {
        label: 'Show',
        to: Router.paths.profileShow,
      },
    ],
  },
  {
    label: 'List',
    to: Router.paths.list,
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
