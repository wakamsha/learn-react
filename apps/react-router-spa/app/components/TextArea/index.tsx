import type { FC, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.css';

type TextAreaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = Pick<TextAreaAttributes, 'id' | 'name' | 'defaultValue' | 'rows'>;

/**
 * TextArea コンポーネントは、複数行のテキスト入力で、ユーザーが大量のテキストを入力する場合に便利です。
 */
export const TextArea: FC<Props> = ({ id, name, defaultValue, rows }) => (
  <textarea className={styles.base} id={id} name={name} defaultValue={defaultValue} rows={rows} />
);
