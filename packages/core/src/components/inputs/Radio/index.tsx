import { css } from '@emotion/css';
import { ChangeEvent, ReactNode } from 'react';
import { BorderRadius, Color, Duration, FontSize } from '../../../constants/Style';
import { gutter, square } from '../../../helpers/Style';

type Props = {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Radio = ({ name, checked = false, disabled, value, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    !disabled && onChange?.(e);
  };

  return (
    <span className={styleBase}>
      <span className={styleIndicator} aria-checked={checked} aria-disabled={disabled}>
        <span className={styleSymbol} aria-checked={checked} />
      </span>
      <input
        type="radio"
        className={styleInput}
        name={name}
        checked={checked}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
    </span>
  );
};

type LabelProps = {
  children: ReactNode;
  label: string;
};

Radio.Label = ({ children, label }: LabelProps) => (
  <label className={styleLabel}>
    {children}
    <span>{label}</span>
  </label>
);

const styleBase = css`
  position: relative;
  display: inline-flex;

  &:focus-within {
    outline: 1px auto;
    outline-offset: 2px;
  }
`;

const styleIndicator = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid ${Color.LineLight};
  border-radius: ${BorderRadius.Circle};
  transition: border ${Duration.Fade};
  ${square(20)}

  &[aria-checked='true'] {
    border-color: ${Color.LineNeutral};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    background-color: ${Color.ThemeDisabledNeutral};
    border-color: ${Color.LineNeutral};
  }
`;

const styleSymbol = css`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  background-color: ${Color.ThemePrimaryNeutral};
  border-radius: ${BorderRadius.Circle};
  transition: transform ${Duration.Fade};
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1);
  ${square(12)}

  &[aria-checked='true'] {
    transform: translate3d(-50%, -50%, 0) scale3d(1, 1, 1);
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
