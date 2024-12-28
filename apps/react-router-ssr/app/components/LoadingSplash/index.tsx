import type { FC } from 'react';
import styles from './styles.module.css';

/**
 * データの読み込み中に表示されるスプラッシュ画面
 */
export const LoadingSplash: FC = () => (
  <div className={styles.base}>
    <div className={styles.spinner} />

    <p>Loading, please wait...</p>
  </div>
);
