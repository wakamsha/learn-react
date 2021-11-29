import type { ReactNode } from 'react';
import { createRoutesFromChildren, matchRoutes, Routes, useLocation } from 'react-router-dom';
import { Transition } from '../Transition';

type Props = {
  children: ReactNode;
  /**
   * 親 route の URL パス。
   *
   * `<PageTransition>` を入れ子にして使用する際は、親となる `<Route>` の `path` を指定する必要があります。
   */
  parentPath?: string;
};

export const PageTransition = ({ children, parentPath = '' }: Props) => {
  const location = useLocation();

  const routes = createRoutesFromChildren(children).map(route => ({
    ...route,
    ...(route.path && parentPath ? { path: `${parentPath}${route.path}` } : {}),
  }));

  const matchedRoute = matchRoutes(routes, location)?.[0] ?? { pathnameBase: '' };

  return (
    <Transition id={matchedRoute.pathnameBase}>
      <Routes>{children}</Routes>
    </Transition>
  );
};
