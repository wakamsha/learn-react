import { css } from '@emotion/css';
import { useEffect, useRef, type ChangeEvent, type ReactNode } from 'react';
import { BorderRadius, Duration, FontSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';

type Props = Partial<{
  /**
   * `true` の場合、チェックボックスにチェックが入る。
   */
  checked: boolean;
  value: string | number;
  disabled: boolean;
  /**
   * `true` の場合、コンポーネントは不定形に表示される。
   */
  indeterminate: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}>;

/**
 * チェックボックスは、ユーザーが一つまたは複数の項目を選択する UI です。
 *
 * オプションが1つの場合は、チェックボックスの代わりにオン/オフスイッチを使用します。
 */
export const Checkbox = ({ checked, value, disabled, indeterminate = false, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const ariaChecked = indeterminate ? 'mixed' : checked;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event);
  };

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
        ref={inputRef}
        className={styleInput}
        type="checkbox"
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

  &:focus-within {
    outline: 1px auto;
    outline-offset: 2px;
  }
`;

const styleIndicator = css`
  display: inline-block;
  background-color: white;
  border: 1px solid ${cssVar('LineNeutral')};
  border-radius: ${BorderRadius.Small};
  transition:
    background-color ${Duration.Fade},
    border ${Duration.Fade};
  ${square(20)}

  &:not([aria-checked='false']) {
    background-color: ${cssVar('ThemePrimaryNeutral')};
    border-color: ${cssVar('ThemePrimaryNeutral')};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    background-color: ${cssVar('ThemeDisabledNeutral')};
    border-color: ${cssVar('LineNeutral')};
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
    background-color: white;
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
