import { type FC } from 'react';
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from 'react-router';
import { Callback } from './routes/Callback';
import { Value } from './routes/Value';

export const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      children: [
        {
          path: '/callback',
          Component: Callback,
        },
        {
          path: '/value',
          Component: Value,
        },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

const Layout: FC = () => (
  <main>
    <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <NavLink to="/callback">Callback</NavLink>
      <NavLink to="/value">Value</NavLink>
    </nav>
    <Outlet />
  </main>
);
