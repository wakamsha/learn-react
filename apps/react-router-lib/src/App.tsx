import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { clientLoader as rootLoader, WithSidebar } from './layouts/WithSidebar';
import { Paths } from './routes';
import { About } from './routes/about/route';
import { Contact, clientAction as contactAction, clientLoader as contactLoader } from './routes/contacts/contact/route';
import { clientAction as contactDestroyAction } from './routes/contacts/destroy/route';
import {
  clientAction as contactEditAction,
  clientLoader as contactEditLoader,
  Edit,
} from './routes/contacts/edit/route';
import { Error } from './routes/error/route';
import { Home } from './routes/home/route';
import { clientAction as contactNewAction } from './routes/new/route';

/**
 * Renders the app.
 */
export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={Paths.Home} element={<WithSidebar />} loader={rootLoader} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path={Paths.Contacts.Contact} element={<Contact />} loader={contactLoader} action={contactAction} />
          <Route path={Paths.Contacts.Edit} element={<Edit />} loader={contactEditLoader} action={contactEditAction} />
          <Route path={Paths.Contacts.Destroy} action={contactDestroyAction} />
          <Route path={Paths.New} action={contactNewAction} />
        </Route>
        <Route path={Paths.About} element={<About />} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};
