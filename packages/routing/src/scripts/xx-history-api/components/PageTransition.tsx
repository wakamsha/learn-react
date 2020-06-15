import { LocationContext } from '../hooks/useHistory';
import { Route, Switch, matchPath } from 'react-router-dom';
import { Transition } from './Transition';
import { useContext } from '../../_core/hooks/useContext';
import React, { Children, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const PageTransition = ({ children }: Props) => {
  const location = useContext(LocationContext);

  let match: any;

  Children.toArray(children).some((route: Route) => {
    match = matchPath<any>(location.pathname, route.props);
    return !!match;
  });

  return (
    <Transition id={match ? match.path + JSON.stringify(match.params) : ''}>
      <Switch location={location}>{children}</Switch>
    </Transition>
  );
};
