import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { BrowserRouter, Outlet, RouteObject, useRoutes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { About } from './pages/About';
import { Friends } from './pages/Friends';
import { Home } from './pages/Home';

/**
 * `<Routes>` および `<Route>` の代わりに `useRoutes` フックでルーティングを定義する。
 *
 * @see https://reactrouter.com/docs/en/v6/examples/route-objects
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
          path: '/about',
          element: <About />,
        },
        {
          path: '/friends/*',
          element: <Friends />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  return element;
};

const Layout = () => (
  <div className={styleBase}>
    <nav>
      <Navigation />
    </nav>
    <div className={styleContent}>
      <Outlet />
    </div>
  </div>
);

const styleBase = css`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const styleContent = css`
  padding: ${gutter(4)};
`;

const NotFound = () => <h1>404 Not Found</h1>;
