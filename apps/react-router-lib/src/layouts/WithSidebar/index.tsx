import { clsx } from 'clsx';
import { useEffect, useState, type FormEvent } from 'react';
import { Outlet, useLoaderData, useNavigation, useSubmit, type LoaderFunctionArgs } from 'react-router';
import { getContacts } from '../../data';
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
export const WithSidebar = () => {
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
