import { css } from '@emotion/css';
import { Sidebar } from '@learn-react/core/components/navigation/Sidebar';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { gutter } from '@learn-react/core/helpers/Style';
import { ComponentProps } from 'react';
import { Route } from 'react-router-dom';
import { Router } from '../../@core/constants/Router';
import { HomePage } from '../pages/Home';
import { ListPage } from '../pages/ListPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Profile } from '../pages/profiles';

export const App = () => (
  <div className={styleBase}>
    <Sidebar title="MobX Hooks | Statement" items={linkItems} />
    <div className={styleContent}>
      <PageTransition>
        <Route path={Router.paths.home} component={HomePage} exact />
        <Route path={Router.paths.profile} component={Profile} />
        <Route path={Router.paths.list} component={ListPage} />
        <Route component={NotFoundPage} />
      </PageTransition>
    </div>
  </div>
);

const linkItems: ComponentProps<typeof Sidebar>['items'] = [
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

const styleBase = css`
  display: flex;
  width: 100%;
`;

const styleContent = css`
  flex-grow: 1;
  height: 100vh;
  padding: ${gutter(4)};
`;
