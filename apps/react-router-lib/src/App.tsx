import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { loader as rootLoader, WithSidebar } from './layouts/WithSidebar';
import { Paths } from './routes';
import { Error } from './routes/error/route';

/**
 * Renders the app.
 */
export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={Paths.Home} element={<WithSidebar />} loader={rootLoader} errorElement={<Error />}>
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
