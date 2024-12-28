import type { FC } from 'react';
import styles from './styles.module.css';

type Props = {
  message: string;
  details: string;
  stack?: string;
};

/**
 * An error page.
 */
export const ErrorPage: FC<Props> = ({ message, details, stack }) => (
  <main className={styles.base}>
    <h1>{message}</h1>

    <p>{details}</p>

    {stack ? (
      <pre>
        <code>{stack}</code>
      </pre>
    ) : null}
  </main>
);
