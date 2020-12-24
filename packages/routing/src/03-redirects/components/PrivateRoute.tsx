import { ComponentType } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { fakeAuth } from '../stores/Auth';

type Props = {
  component: ComponentType<any>;
  path: string;
};

export const PrivateRoute = (props: Props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
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
};
