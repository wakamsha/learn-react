import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/PageTransition';
import { gutter } from '@learn-react/core/helpers/Style';

import { Redirect, Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import { ProfileContainer } from '../../containers/ProfileContainer';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';

export const ProfilePage = () => (
  <section className={baseStyle}>
    <h1>Profile</h1>
    <ProfileContainer.Provider>
      <PageTransition>
        <Route path={Router.paths.profileShow} component={ProfileShowPage} />
        <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
        <Redirect to={Router.paths.profileShow} />
      </PageTransition>
    </ProfileContainer.Provider>
  </section>
);

const baseStyle = css`
  padding: ${gutter(4)};
`;
