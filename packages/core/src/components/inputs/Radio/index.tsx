import { css } from '@emotion/css';
import { type ChangeEvent, type ReactNode } from 'react';
import { BorderRadius, Duration, FontSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';

type Props = {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * ラジオボタンは、ユーザーが一連の選択肢の中から1つを選ぶことができるものです。
 *
 * ラジオボタンは、ユーザーがすべての利用可能なオプションを確認する必要がある場合に使用します。
 * 利用可能なオプションを折りたたむことができる場合は、 Select コンポーネントを使用することを検討します。
 */
export const Radio = ({ name, checked = false, disabled, value, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(event);
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
  background-color: white;
  border: 1px solid ${cssVar('LineLight')};
  border-radius: ${BorderRadius.Circle};
  transition: border ${Duration.Fade};
  ${square(20)}

  &[aria-checked='true'] {
    border-color: ${cssVar('LineNeutral')};
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
  background-color: ${cssVar('ThemePrimaryNeutral')};
  border-radius: ${BorderRadius.Circle};
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1);
  transition: transform ${Duration.Fade};
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
