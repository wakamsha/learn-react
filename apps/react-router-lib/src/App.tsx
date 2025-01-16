import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { ErrorBoundary } from './layouts/WithSidebar/route';
import { Paths } from './routes';

/**
 * Renders the app.
 */
export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={Paths.Home} lazy={() => import('./layouts/WithSidebar/route')} errorElement={<ErrorBoundary />}>
          <Route index lazy={() => import('./routes/home/route')} />
          <Route path={Paths.Contacts.Contact} lazy={() => import('./routes/contacts/contact/route')} />
          <Route path={Paths.Contacts.Edit} lazy={() => import('./routes/contacts/edit/route')} />
          <Route path={Paths.Contacts.Destroy} lazy={() => import('./routes/contacts/destroy/route')} />
          <Route path={Paths.New} lazy={() => import('./routes/new/route')} />
        </Route>
        <Route path={Paths.About} lazy={() => import('./routes/about/route')} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};
