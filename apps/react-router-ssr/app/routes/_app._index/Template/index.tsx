import type { FC } from 'react';
import styles from './styles.module.css';

/**
 * The Home page.
 */
export const Template: FC = () => (
  <p className={styles.base}>
    This is a demo for React Router.
    <br />
    Check out{' '}
    <a href="https://reactrouter.com" className={styles.link}>
      the docs at reactrouter.com
    </a>
    .
  </p>
);
