import { HomePage } from '../pages/HomePage';
import { ListPage } from '../pages/profiles/ListPage';
import { Navigation } from '../../@core/components/Navigation';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PageTransition } from '../../@core/components/PageTransition';
import { ProfilePage } from '../pages/profiles';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { css } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
import React, { ComponentProps } from 'react';

export const App = () => (
  <div className={baseStyle}>
    <Navigation title="Unstated Basic" items={linkItems} />
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
