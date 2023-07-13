import { css } from '@emotion/css';
import { type ChangeEvent } from 'react';
import { Duration, FontSize, LineHeight } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';

type Props = {
  value: string;
  name: string;
  onChange: (value: string) => void;
  id?: string;
  /**
   * @default 1
   */
  minRows?: number;
  /**
   * @default Infinity
   */
  maxRows?: number;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  /**
   * 入力値が不正かどうか
   *
   * @default false
   */
  invalid?: boolean;
};

/**
 * TextArea コンポーネントは、複数行のテキスト入力で、ユーザーが大量のテキストを入力する場合に便利です。
 *
 * テキストエリアの高さはコンテンツに応じて自動的に伸縮します。
 */
export const TextArea = ({
  value,
  name,
  onChange,
  id,
  minRows = 1,
  maxRows = Infinity,
  placeholder,
  disabled,
  readonly,
  tabIndex,
  autoFocus,
  invalid,
}: Props) => {
  const rows = Math.min(Math.max(minRows, value.split(`\n`).length), maxRows);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styleBase} aria-disabled={disabled} aria-invalid={invalid}>
      <textarea
        rows={rows}
        value={value}
        name={name}
        id={id}
        className={styleInput}
        placeholder={placeholder}
        readOnly={readonly}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        onChange={handleChange}
      />
    </div>
  );
};

const styleBase = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: none;
  transition: box-shadow ${Duration.Fade};

  &::after {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    content: '';
    background-color: ${cssVar('ThemePrimaryDark')};
  }

  &[aria-disabled='true'] {
    background-color: ${cssVar('ThemeDisabledLight')};
  }

  &:focus-within {
    box-shadow: inset 0 -2px 0 0 ${cssVar('ThemePrimaryDark')};
  }

  &[aria-invalid='true'] {
    &::after {
      background-color: ${cssVar('ThemeDangerNeutral')};
    }

    &:focus-within {
      box-shadow: inset 0 -2px 0 0 ${cssVar('ThemeDangerNeutral')};
    }
  }
`;

const styleInput = css`
  width: 100%;
  padding: ${gutter(2)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
  color: ${cssVar('TextNeutral')};
  -webkit-appearance: none;
  -moz-appearance: none;
  resize: none;
  background-color: transparent;
  border: none;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button,
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &:disabled {
    color: ${cssVar('TextSub')};
  }
`;
