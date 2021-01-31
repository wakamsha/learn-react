import { css } from '@emotion/css';
import { ChangeEvent, ReactNode, useEffect, useRef } from 'react';
import { BorderRadius, Color, Duration, FontSize } from '../../../constants/Style';
import { gutter, square } from '../../../helpers/Style';

type Props = Partial<{
  checked: boolean;
  value: string | number;
  disabled: boolean;
  indeterminate: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>;

export const Checkbox = ({ checked, value, disabled, indeterminate = false, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const ariaChecked = checked || (indeterminate ? 'mixed' : false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => !disabled && onChange?.(e);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <span className={styleBase}>
      <span className={styleIndicator} aria-checked={ariaChecked} aria-disabled={disabled}>
        <span className={styleSymbol} aria-checked={ariaChecked} />
      </span>
      <input
        className={styleInput}
        type="checkbox"
        ref={inputRef}
        checked={checked}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
    </span>
  );
};

type LabelProps = {
  children: ReactNode;
  label: string;
};

Checkbox.Label = ({ children, label }: LabelProps) => (
  <label className={styleLabel}>
    {children}
    <span>{label}</span>
  </label>
);

const styleBase = css`
  position: relative;
  display: inline-flex;
`;

const styleIndicator = css`
  display: inline-block;
  background-color: white;
  border: 1px solid ${Color.LineDefault};
  border-radius: ${BorderRadius.Small};
  transition: background-color ${Duration.Fade}, border ${Duration.Fade};
  ${square(20)}

  &:not([aria-checked='false']) {
    background-color: ${Color.ThemePrimaryNeutral};
    border-color: ${Color.ThemePrimaryNeutral};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    background-color: ${Color.ThemeDisabledNeutral};
    border-color: ${Color.LineDefault};
  }
`;

const styleSymbol = css`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;

  &[aria-checked='true'] {
    width: 7px;
    height: 13px;
    margin-top: -1px;
    border-right: 3px solid white;
    border-bottom: 3px solid white;
    transform: translate3d(-50%, -50%, 0) rotate(40deg);
  }

  &[aria-checked='mixed'] {
    width: 10px;
    height: 3px;
    background: white;
    transform: translate3d(-50%, -50%, 0);
  }
`;

const styleInput = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  cursor: pointer;
  opacity: 0;
  ${square('100%')}

  &:disabled {
    cursor: not-allowed;
  }
`;

const styleLabel = css`
  display: inline-flex;
  align-items: center;
  font-size: ${FontSize.Regular};
  cursor: pointer;
  user-select: none;

  > :not(:first-child) {
    margin-left: ${gutter(2)};
  }
`;
