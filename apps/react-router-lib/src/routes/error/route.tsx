import { type FC } from 'react';
import { useRouteError } from 'react-router';
import styles from './styles.module.css';

/**
 * An error page.
 */
export const Error: FC = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <main className={styles.base}>
      <h1>Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>

      <pre>
        <code>{JSON.stringify(error, null, 2)}</code>
      </pre>
    </main>
  );
};
