import { HistoryStore } from '../stores/HistoryStore';
import { HomePage } from '../pages/Home';
import { ListPage } from '../pages/ListPage';
import { Navigation } from '../../@core/components/Navigation';
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
  <HistoryStore.Context.Provider value={Stores.historyStore}>
    <div className={baseStyle}>
      <Navigation title="MobX Hooks" items={linkItems} />
      <div className={contentStyle}>
        <PageTransition>
          <Route path={Router.paths.home} component={HomePage} exact />
          <Route path={Router.paths.profile} component={Profile} />
          <Route path={Router.paths.list} component={ListPage} />
          <Route component={NotFoundPage} />
        </PageTransition>
      </div>
    </div>
  </HistoryStore.Context.Provider>
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
