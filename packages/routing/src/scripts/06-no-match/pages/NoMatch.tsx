import * as React from 'react';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps;

export const NoMatch = (props: Props) => (
  <>
    <h1>Opps!!</h1>
    <p>
      No match form <code>{props.location.pathname}</code>
    </p>
  </>
);
