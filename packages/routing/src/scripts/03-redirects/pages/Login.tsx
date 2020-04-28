import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { fakeAuth } from '../stores/Auth';

type LocationState = {
  from: {
    pathname: string;
  };
};

type Props = RouteComponentProps<{}, {}, LocationState>;

export const Login = ({ location }: Props) => {
  const [redirectTiReferrer, setState] = React.useState(false);

  const handleClick = React.useCallback(
    () =>
      fakeAuth.authenticate(() => {
        setState(true);
      }),
    [],
  );

  const { from } = location.state || { from: { pathname: '/' } };

  return redirectTiReferrer ? (
    <Redirect to={from} />
  ) : (
    <>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={handleClick}>Login</button>
    </>
  );
};
