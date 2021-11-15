import { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { fakeAuth } from '../stores/Auth';

type Props = {
  component: ComponentType<any>;
  path: string;
};

export const PrivateRoute = ({ component: Component, path }: Props) => (
  <Route
    path={path}
    render={(props: RouteComponentProps) =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
