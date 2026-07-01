import { createBrowserRouter, RouterProvider } from 'react-router';
import { Component, loader } from './routes/home/route';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      Component,
      loader,
    },
  ]);

  return <RouterProvider router={router} />;
};
