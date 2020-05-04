import { RouteComponentProps } from 'react-router';
import React from 'react';

type Props = RouteComponentProps;

export const NoMatch = ({ location }: Props) => (
  <>
    <h1>Opps!!</h1>
    <p>
      No match form <code>{location.pathname}</code>
    </p>
  </>
);
