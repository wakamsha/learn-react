import { clsx } from 'clsx';
import type { FC, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type Props = {
  loading?: boolean;
} & Pick<
  InputAttributes,
  'id' | 'name' | 'value' | 'defaultValue' | 'placeholder' | 'onChange' | 'type' | 'aria-label'
>;

/**
 * テキストフィールドは、ユーザーがテキストを入力・編集する UI です。
 *
 * 一般的には、フォームやダイアログに表示されます。
 */
export const TextInput: FC<Props> = ({
  loading = false,
  id,
  name,
  value,
  defaultValue,
  placeholder,
  onChange,
  type = 'text',
  'aria-label': ariaLabel,
}) => (
  <input
    id={id}
    className={clsx(styles.base, loading && styles.loading)}
    name={name}
    value={value}
    defaultValue={defaultValue}
    placeholder={placeholder}
    type={type}
    aria-label={ariaLabel}
    onChange={onChange}
  />
);
