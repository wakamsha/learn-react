import { css } from '@emotion/css';
import { type IconName } from '@learn-react/icon';
import { type ChangeEvent } from 'react';
import { Duration, FontSize, LineHeight } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

type Option<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type OptGroup<T> = {
  id: string | number;
  label: string;
  options: Option<T>[];
};

type Props<T> = {
  onChange: (item: Option<T>, index: number) => void;
  id?: string;
  disabled?: boolean;
  tabIndex?: number;
  /** 先頭に表示するアイコン */
  icon?: IconName;
} & XOR<
  {
    options: Option<T>[];
  },
  {
    optGroups: OptGroup<T>[];
  }
> &
  XOR<
    {
      value: T;
    },
    {
      selectedIndex: number;
    }
  >;

/**
 * Selectコンポーネントは、ユーザーが提供する情報を選択肢の中から収集するために使用する UI です。
 */
export const Select = <T extends string | number>({
  onChange,
  id,
  disabled,
  tabIndex,
  icon,
  options,
  optGroups,
  value: propValue,
  selectedIndex,
}: Props<T>) => {
  const flattenedOptions = options ?? optGroups.reduce((acc: Option<T>[], { options }) => [...acc, ...options], []);

  const value = propValue ?? (selectedIndex !== undefined ? flattenedOptions[selectedIndex].value : undefined);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;
    onChange(flattenedOptions[event.target.selectedIndex], event.target.selectedIndex);
  };

  return (
    <div className={styleBase} aria-disabled={disabled}>
      {icon ? (
        <span className={styleIcon} role="presentation">
          <Icon name={icon} />
        </span>
      ) : null}
      <select
        id={id}
        className={styleSelect}
        value={value}
        disabled={disabled}
        tabIndex={tabIndex}
        onChange={handleChange}
      >
        {options ? <Options options={options} /> : <OptGroups optGroups={optGroups} />}
      </select>
      <span className={styleSymbol} role="presentation">
        <Icon name="caret-updown" />
      </span>
    </div>
  );
};

const Options = <T extends string | number>({ options }: { options: Option<T>[] }) => (
  <>
    {options.map(({ label, value, disabled }) => (
      <option key={value} value={value} disabled={disabled}>
        {label}
      </option>
    ))}
  </>
);

const OptGroups = <T extends string | number>({ optGroups }: { optGroups: OptGroup<T>[] }) => (
  <>
    {optGroups.map(({ id, label, options }) => (
      <optgroup key={id} label={label}>
        <Options options={options} />
      </optgroup>
    ))}
  </>
);

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
  ${square(24)}

  > svg {
    fill: ${cssVar('ThemePrimaryNeutral')};
  }
`;

const styleSelect = css`
  display: inline-flex;
  flex: 1 1 100%;
  padding: ${gutter(2)} ${gutter(6)} ${gutter(2)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
  color: ${cssVar('TextNeutral')};
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button,
  &::-webkit-search-cancel-button {
    appearance: none;
  }

  &:disabled {
    color: ${cssVar('TextSub')};
  }
`;

const styleSymbol = css`
  position: absolute;
  top: 50%;
  right: 0;
  pointer-events: none;
  transform: translate3d(0, -50%, 0);
  ${square(24)}

  > svg {
    fill: ${cssVar('ThemePrimaryNeutral')};
  }
`;
