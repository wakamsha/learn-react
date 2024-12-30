import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { BrowserRouter, Outlet, useRoutes, type RouteObject } from 'react-router';
import { Navigation } from './components/Navigation';
import { About } from './routes/About';
import { Beatles } from './routes/Beatles';
import { Home } from './routes/Home';
import { Zeppelin } from './routes/Zeppelin';

/**
 * `<Routes>` および `<Route>` の代わりに `useRoutes` フックでルーティングを定義する。
 *
 * @deprecated
 * `useRoutes` は v7 のドキュメントに記載されていないため、特別な理由がない限り使用しないこと。
 */
export const RouteObjects = () => (
  // useRoutes は BrowserRouter 配下でしか使えないため、
  // 仕方なくコンポーネントを分割している。
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const App = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/beatles/*',
          element: <Beatles />,
        },
        {
          path: '/zeppelin/*',
          element: <Zeppelin />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
    {
      path: '/about',
      element: <About />,
    },
  ];

  const element = useRoutes(routes);

  return element;
};

const Layout = () => (
  <div className={styleBase}>
    <nav className={styleSidebar}>
      <Navigation />
    </nav>
    <main className={styleContent}>
      <Outlet />
    </main>
  </div>
);

const styleBase = css`
  display: grid;
  grid-template-areas: 'sidebar content';
  grid-template-columns: 240px 1fr;
  width: 100%;
  height: 100dvh;
`;

const styleSidebar = css`
  grid-area: sidebar;
  overflow: hidden;
  border-right: 1px solid ${cssVar('LineLight')};
`;

const styleContent = css`
  grid-area: content;
  padding: ${gutter(4)};
`;

const NotFound = () => <h1>404 Not Found</h1>;
