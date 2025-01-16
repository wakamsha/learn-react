import { clsx } from 'clsx';
import { useEffect, useState, type FC, type FormEvent } from 'react';
import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSubmit,
  type LoaderFunctionArgs,
} from 'react-router';
import { getContacts } from '../../data';
import { ErrorTemplate } from './error';
import { Sidebar } from './Sidebar';
import styles from './styles.module.css';

/**
 * Fetches contacts data and returns it as a prop.
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  const contacts = await getContacts(q);

  return {
    contacts,
    q,
  };
}

/**
 * Renders a sidebar layout.
 */
export const Component = () => {
  const { contacts, q } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  const submit = useSubmit();

  const [query, setQuery] = useState(q ?? '');

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const handleFormChange = async (event: FormEvent<HTMLFormElement>) => {
    const isFirstSearch = q === null;

    await submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  };

  useEffect(() => {
    setQuery(q ?? '');
  }, [q]);

  return (
    <div className={styles.base}>
      <div className={styles.sidebar}>
        <Sidebar
          contacts={contacts}
          query={query}
          searching={searching}
          onQueryChange={handleQueryChange}
          onSubmit={handleFormChange}
        />
      </div>

      <div className={clsx(styles.detail, navigation.state === 'loading' && !searching ? styles.loading : '')}>
        <Outlet />
      </div>
    </div>
  );
};

/**
 * Error boundary for the app.
 *
 * The top most error boundary for the app, rendered when your app throws an error
 * For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
 */
export const ErrorBoundary: FC = () => {
  const error = useRouteError();

  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return <ErrorTemplate message={message} details={details} stack={stack} />;
};
