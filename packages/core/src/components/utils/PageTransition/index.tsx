import { Children, ReactNode } from 'react';
import { Route, Switch, matchPath, useLocation } from 'react-router-dom';
import { Transition } from '../Transition';

type Props = {
  children: ReactNode;
};

export const PageTransition = ({ children }: Props) => {
  const location = useLocation();

  let match: any;

  Children.toArray(children).some(route => {
    match = matchPath<any>(location.pathname, (route as Route).props);
    return !!match;
  });

  return (
    <Transition id={match ? match.path + JSON.stringify(match.params) : ''}>
      <Switch>{children}</Switch>
    </Transition>
  );
};
