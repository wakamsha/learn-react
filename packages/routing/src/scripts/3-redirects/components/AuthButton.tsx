import * as React from 'react';
import { fakeAuth } from '../stores/Auth';
import { withRouter } from 'react-router';

export const AuthButton = withRouter(({ history }) =>
  fakeAuth.isAuthenticated ? (
    <>
      <p>Welcome!</p>
      <button onClick={() => fakeAuth.signOut(() => history.push('/'))}>Sign out</button>
    </>
  ) : (
    <p>You are not logged in.</p>
  ),
);
