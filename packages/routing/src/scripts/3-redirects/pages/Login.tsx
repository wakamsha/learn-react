import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { fakeAuth } from '../stores/Auth';

type Props = RouteComponentProps;

export const Login = (props: Props) => {
  const [redirectTiReferrer, setState] = React.useState(false);

  const handleClick = React.useCallback(
    () =>
      fakeAuth.authenticate(() => {
        setState(true);
      }),
    [],
  );

  const { from } = props.location.state || { from: { pathname: '/' } };

  return redirectTiReferrer ? (
    <Redirect to={from} />
  ) : (
    <>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={handleClick}>Login</button>
    </>
  );
};
