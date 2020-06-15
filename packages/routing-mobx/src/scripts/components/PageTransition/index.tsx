import { HistoryStore } from '../../stores/HistoryStore';
import { Route, Switch, match, matchPath } from 'react-router';
import { Transition } from '../Transition';
import { useObserver } from 'mobx-react';
import React, { Children, ReactNode } from 'react';

type Props = {
  historyStore: HistoryStore;
  children: ReactNode;
};

export const PageTransition = ({ historyStore, children }: Props): JSX.Element => {
  const location = useObserver(() => historyStore.location);

  let m: match<any> | null = { params: null, isExact: false, path: '', url: '' };

  Children.toArray(children).some((route: Route) => {
    m = matchPath<any>(location.pathname, route.props);
    return !!m;
  });

  return (
    <Transition id={m ? m.path + JSON.stringify(m.params) : ''}>
      <Switch location={location}>{children}</Switch>
    </Transition>
  );
};
