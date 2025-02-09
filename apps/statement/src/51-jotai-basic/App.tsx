import { css } from '@emotion/css';
import { Sidebar } from '@learn-react/core/src/components/navigation/Sidebar';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { type ComponentProps } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Router } from '../@core/constants/Router';
import { HomePage } from './pages/HomePage';
import { ListPage } from './pages/ListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/profiles';
import { UsersPage } from './pages/Users';

export const App = () => (
  <div className={styleBase}>
    <Sidebar title="Jotai Basic" items={linkItems} />

    <div className={styleContent}>
      <Routes>
        <Route path={Router.paths.home} element={<HomePage />} />
        <Route path={`${Router.paths.profile}/*`} element={<ProfilePage />} />
        <Route path={Router.paths.list} element={<ListPage />} />
        <Route path={Router.paths.users} element={<UsersPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </div>
  </div>
);

const linkItems: ComponentProps<typeof Sidebar>['items'] = [
  {
    label: 'Profile',
    items: [
      {
        label: 'Edit',
        to: `${Router.paths.home}${Router.paths.profile}/${Router.paths.profileEdit}`,
      },
      {
        label: 'Show',
        to: `${Router.paths.home}${Router.paths.profile}/${Router.paths.profileShow}`,
      },
    ],
  },
  {
    label: 'List',
    to: `${Router.paths.home}${Router.paths.list}`,
  },
  {
    label: 'Users',
    to: `${Router.paths.home}${Router.paths.users}`,
  },
];

const styleBase = css`
  display: flex;
  width: 100%;
`;

const styleContent = css`
  flex-grow: 1;
  height: 100dvh;
  padding: ${gutter(4)};
`;
