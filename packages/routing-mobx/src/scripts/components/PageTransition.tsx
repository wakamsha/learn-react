import { HistoryStore } from '../stores/HistoryStore';
import { Route, Switch, matchPath } from 'react-router';
import { Transition } from './Transition';
import { observer } from 'mobx-react';
import React, { Children, ReactNode } from 'react';

type Props = {
  historyStore: HistoryStore;
  children: ReactNode;
};

export const PageTransition = observer(({ historyStore, children }: Props) => {
  let match: any;
  Children.toArray(children).some((route: Route) => {
    match = matchPath<any>(historyStore.pathname, route.props);
    return !!match;
  });
  return (
    <Transition id={match ? match.path + JSON.stringify(match.params) : ''}>
      <Switch location={historyStore.location}>{children}</Switch>
    </Transition>
  );
});
