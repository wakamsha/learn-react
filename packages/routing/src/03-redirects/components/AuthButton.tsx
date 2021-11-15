import { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { fakeAuth } from '../stores/Auth';

type Props = RouteComponentProps;

const Component = ({ history }: Props) => {
  const handleClick = useCallback(() => fakeAuth.signOut(() => history.push('/')), [history]);

  return fakeAuth.isAuthenticated ? (
    <>
      <p>Welcome!</p>
      <button onClick={handleClick}>Sign out</button>
    </>
  ) : (
    <p>You are not logged in.</p>
  );
};

export const AuthButton = withRouter(Component);
