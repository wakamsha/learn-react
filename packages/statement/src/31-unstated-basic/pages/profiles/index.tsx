import { PageTransition } from '../../../@core/components/PageTransition';
import { ProfileContainer } from '../../containers/ProfileContainer';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';
import { Redirect, Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import { css } from 'emotion';
import { gutter } from '@learn-react/core/helpers/Style';
import React from 'react';

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
