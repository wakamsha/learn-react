import { Route, Switch, matchPath } from 'react-router-dom';
import { Transition } from '../../@core/components/Transition';
import { useRouting } from './RoutingProvider';
import React, { Children, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const PageTransition = ({ children }: Props) => {
  const { location } = useRouting();

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
