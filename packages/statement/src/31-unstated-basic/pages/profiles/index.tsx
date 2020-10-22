import { PageTransition } from '../../../@core/components/PageTransition';
import { ProfileContainer } from '../../containers/ProfileContainer';
import { ProfileEditPage } from './EditPage';
import { ProfileShowPage } from './ShowPage';
import { Redirect, Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import React from 'react';

export const ProfilePage = () => (
  <>
    <h1>Profile</h1>
    <ProfileContainer.Provider>
      <PageTransition>
        <Route path={Router.paths.profileShow} component={ProfileShowPage} />
        <Route path={Router.paths.profileEdit} component={ProfileEditPage} />
        <Redirect to={Router.paths.profileShow} />
      </PageTransition>
    </ProfileContainer.Provider>
  </>
);
