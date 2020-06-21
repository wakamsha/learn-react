import { HistoryStore } from '../stores/HistoryStore';
import { Route, Switch, match, matchPath } from 'react-router';
import { Transition } from '../../@core/components/Transition';
import { observer } from 'mobx-react';
import React, { Children, ReactNode } from 'react';

type Props = {
  historyStore: HistoryStore;
  children: ReactNode;
};

export const PageTransition = observer(({ historyStore, children }: Props) => {
  let m: match<any> | null = { params: null, isExact: false, path: '', url: '' };

  Children.toArray(children).some((route: Route) => {
    m = matchPath<any>(historyStore.location.pathname, route.props);
    return !!m;
  });

  return (
    <Transition id={m ? m.path + JSON.stringify(m.params) : ''}>
      <Switch location={historyStore.location}>{children}</Switch>
    </Transition>
  );
});
