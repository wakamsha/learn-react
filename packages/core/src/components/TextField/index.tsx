import { css } from '@emotion/css';
import { ChangeEvent } from 'react';
import { Color, Duration, FontSize, LineHeight } from '../../constants/Style';
import { gutter, square } from '../../helpers/Style';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

type Props = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  pattern?: string;
  tabIndex?: number;
  clearable?: boolean;
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

export const TextField = ({
  value,
  onChange,
  id,
  placeholder,
  disabled,
  readonly,
  inputMode,
  pattern,
  tabIndex,
  clearable,
  onFocus,
  type,
  maxLength,
  min,
  max,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  const handleClickClear = () => onChange('');

  return (
    <div className={styleBase} aria-disabled={disabled}>
      {type === 'search' ? (
        <span className={styleIcon} role="presentation">
          <Icon name="search" />
        </span>
      ) : null}
      <input
        id={id}
        className={styleInput}
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
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${Color.ThemePrimaryDark};
  box-shadow: none;
  transition: box-shadow ${Duration.Fade};

  > :not(:first-child) {
    margin-left: ${gutter(4)};
  }

  &[aria-disabled='true'] {
    background-color: ${Color.ThemeDisabledLight};
  }

  &:focus-within {
    box-shadow: 0 1px 0 0 ${Color.ThemePrimaryDark};
  }
`;

const styleIcon = css`
  flex: 0 0 auto;
  ${square(24)}
`;

const styleInput = css`
  flex: 1 1 100%;
  padding: ${gutter(2)} ${gutter(4)} ${gutter(2)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
  color: ${Color.TextNeutral};
  background: transparent;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &:disabled {
    color: ${Color.TextSub};
  }
`;
