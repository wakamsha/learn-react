import { clsx } from 'clsx';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigation, useSubmit } from 'react-router';
import { getContacts } from '../../data';
import type { Route } from './+types/route';
import { Sidebar } from './Sidebar';
import styles from './styles.module.css';

/**
 * Fetches contacts data and returns it as a prop.
 *
 * @remarks
 * This function is a SSR loader.
 */
export async function loader({ request }: Route.LoaderArgs) {
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
export default ({ loaderData: { contacts, q } }: Route.ComponentProps) => {
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
    console.info('query', q);
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
