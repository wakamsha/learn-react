import { css } from '@emotion/css';
import { type IconName } from '@learn-react/icon';
import { type ChangeEvent } from 'react';
import { Duration, FontSize, LineHeight } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';
import { IconButton } from '../IconButton';

type Props = {
  value: string;
  name: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  pattern?: string;
  tabIndex?: number;
  autoFocus?: boolean;
  /** 先頭に表示するアイコン */
  icon?: IconName;
  clearable?: boolean;
  /**
   * 入力値が不正かどうか
   *
   * @default false
   */
  invalid?: boolean;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
} & XOR<
  {
    type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
    maxLength?: number;
  },
  {
    type: 'number';
    min?: number;
    max?: number;
  }
>;

/**
 * テキストフィールドは、ユーザーがテキストを入力・編集する UI です。
 *
 * 一般的には、フォームやダイアログに表示されます。
 *
 * @param props
 */
export const TextField = ({
  value,
  name,
  onChange,
  id,
  placeholder,
  disabled,
  readonly,
  inputMode,
  pattern,
  tabIndex,
  autoFocus,
  icon,
  clearable,
  invalid,
  onFocus,
  type,
  maxLength,
  min,
  max,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClickClear = () => {
    onChange('');
  };

  return (
    <div className={styleBase} aria-disabled={disabled} aria-invalid={invalid}>
      {icon ? (
        <span className={styleIcon} role="presentation">
          <Icon name={icon} />
        </span>
      ) : null}
      <input
        autoFocus={autoFocus}
        id={id}
        className={styleInput}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        inputMode={inputMode}
        pattern={pattern}
        tabIndex={tabIndex}
        onChange={handleChange}
        onFocus={onFocus}
        maxLength={maxLength}
        min={min}
        max={max}
      />
      {clearable && !disabled && value ? (
        <IconButton name="times" variant="bare" size="small" onClick={handleClickClear} />
      ) : null}
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

  > * {
    min-width: 0;
  }

  > :not(:first-child) {
    margin-left: ${gutter(2)};
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

const styleIcon = css`
  flex: 0 0 auto;
  ${square(24)}

  > svg {
    fill: ${cssVar('ThemePrimaryNeutral')};
  }
`;

const styleInput = css`
  display: inline-flex;
  flex: 1 1 100%;
  width: 100%;
  padding: ${gutter(2)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
  color: ${cssVar('TextNeutral')};
  background-color: transparent;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;

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
