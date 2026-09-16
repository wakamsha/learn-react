import { css } from '@emotion/css';
import { Sidebar } from '@learn-react/core/src/components/navigation/Sidebar';
import { PageTransition } from '@learn-react/core/src/components/utils/PageTransition';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { type ComponentProps } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Router } from '../@core/constants/Router';
import { HomePage } from './routes/HomePage';
import { ListPage } from './routes/ListPage';
import { NotFoundPage } from './routes/NotFoundPage';
import { ProfilePage } from './routes/profiles';

export const App = () => (
  <div className={styleBase}>
    <Sidebar title="Constate | Statement" items={linkItems} />
    <div className={styleContent}>
      <PageTransition>
        <Routes>
          <Route path={Router.paths.home} element={<HomePage />} />
          <Route path={`${Router.paths.profile}/*`} element={<ProfilePage />} />
          <Route path={Router.paths.list} element={<ListPage />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
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
