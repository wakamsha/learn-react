import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/src/components/utils/PageTransition';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { Navigate, Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';

export const ProfilePage = () => (
  <section className={baseStyle}>
    <h1>Profile</h1>
    <PageTransition>
      <Route index element={<Navigate replace to={Router.paths.profileShow} />} />
      <Route path={Router.paths.profileShow} element={<ProfileShowPage />} />
      <Route path={Router.paths.profileEdit} element={<ProfileEditPage />} />
    </PageTransition>
  </section>
);

const baseStyle = css`
  padding: ${gutter(4)};
`;
