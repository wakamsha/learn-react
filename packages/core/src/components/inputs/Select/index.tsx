import { css } from '@emotion/css';
import { IconName } from '@learn-react/icon';
import { ChangeEvent, ReactText, useMemo } from 'react';
import { Color, Duration, FontSize, LineHeight } from '../../../constants/Style';
import { gutter, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

type Option<T> = {
  label: string;
  value: T;
};

type OptGroup<T> = {
  id: ReactText;
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
  const opts = useMemo(
    () => options || optGroups?.reduce((acc: Option<T>[], { options }) => [...acc, ...options], []) || [],
    [options, optGroups],
  );

  const value =
    propValue !== undefined ? propValue : selectedIndex !== undefined ? opts[selectedIndex].value : undefined;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    !disabled && onChange(opts[e.target.selectedIndex], e.target.selectedIndex);

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
        onChange={handleChange}
        disabled={disabled}
        tabIndex={tabIndex}
      >
        {options ? <Options options={options} /> : optGroups ? <OptGroups optGroups={optGroups} /> : null}
      </select>
      <span className={styleSymbol} role="presentation">
        <Icon name="caret-updown" />
      </span>
    </div>
  );
};

const Options = <T extends string | number>({ options }: { options: Option<T>[] }) => (
  <>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
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

  &:after {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    content: '';
    background-color: ${Color.ThemePrimaryDark};
  }

  > * {
    min-width: 0;
  }

  > :not(:first-child) {
    margin-left: ${gutter(2)};
  }

  &[aria-disabled='true'] {
    background-color: ${Color.ThemeDisabledLight};
  }

  &:focus-within {
    box-shadow: inset 0 -2px 0 0 ${Color.ThemePrimaryDark};
  }
`;

const styleIcon = css`
  flex: 0 0 auto;
  ${square(24)}
`;

const styleSelect = css`
  display: inline-flex;
  flex: 1 1 100%;
  padding: ${gutter(2)} ${gutter(6)} ${gutter(2)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
  color: ${Color.TextNeutral};
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
    color: ${Color.TextSub};
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
    fill: ${Color.ThemePrimaryNeutral};
  }
`;
