import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { type FC } from 'react';
import styles from './styles.module.css';

/**
 * The Home page.
 */
export const Component: FC = () => (
  <>
    <DocumentTitle title="React Router Contacts" />

    <p className={styles.base}>
      This is a demo for React Router.
      <br />
      Check out{' '}
      <a href="https://reactrouter.com" className={styles.link}>
        the docs at reactrouter.com
      </a>
      .
    </p>
  </>
);
