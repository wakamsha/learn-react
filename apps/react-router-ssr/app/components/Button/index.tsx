import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './styles.module.css';

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

type Theme = 'primary' | 'secondary' | 'danger';

type Props = {
  children: ReactNode;
  /**
   * ボタンのテーマを指定します。
   *
   * @default 'primary'
   */
  theme?: Theme;
} & Pick<ButtonAttributes, 'type' | 'id' | 'disabled' | 'onClick'>;

/**
 * ユーザーがワンタップでアクションを起こしたり選択できる汎用的な UI です。
 *
 * @param props - コンポーネントのプロパティ
 */
export const Button: FC<Props> = ({ children, theme = 'primary', type = 'submit', id, disabled = false, onClick }) => {
  const styleTheme = (() => {
    switch (theme) {
      case 'primary':
        return styles.themePrimary;
      case 'secondary':
        return styles.themeSecondary;
      case 'danger':
        return styles.themeDanger;
    }
  })();

  return (
    <button id={id} className={clsx(styles.base, styleTheme)} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
