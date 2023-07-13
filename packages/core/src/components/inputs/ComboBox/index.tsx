import { css } from '@emotion/css';
import { type IconName } from '@learn-react/icon';
import { useId, useState, type ChangeEvent } from 'react';
import { Duration, FontSize, IconSize, LineHeight } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

type Option<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type Props<T> = {
  value: T | null;
  options: Option<T>[];
  onChange: (item: Option<T> | null) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  /** 先頭に表示するアイコン */
  icon?: IconName;
};

/**
 * コンボボックスは、あらかじめ定義された許容値の集合から選択する UI です。
 */
export const ComboBox = <T extends string | number>({
  value,
  options,
  onChange,
  id,
  placeholder,
  disabled,
  icon,
}: Props<T>) => {
  const listId = useId();

  const [inputValue, setInputValue] = useState(options.find((option) => option.value === value)?.label);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value === '') {
      onChange(null);
      return;
    }

    const selectedItem = options.find(({ label }) => label === e.target.value);

    selectedItem && onChange(selectedItem);
  };

  return (
    <div className={styleBase} aria-disabled={disabled}>
      {icon ? (
        <span className={styleIcon}>
          <Icon name={icon} />
        </span>
      ) : null}
      <input
        id={id}
        className={styleInput}
        list={listId}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
      <datalist id={listId}>
        {options.map(({ value, label, disabled }) => (
          <option key={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </datalist>
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
`;

const styleIcon = css`
  flex: 0 0 auto;
  ${square(IconSize.Large)}

  > svg {
    fill: ${cssVar('ThemePrimaryNeutral')};
  }
`;

const styleInput = css`
  display: inline-flex;
  flex: 1 1 100%;
  padding: ${gutter(2)} ${gutter(2)} ${gutter(2)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
  color: ${cssVar('TextNeutral')};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
`;
