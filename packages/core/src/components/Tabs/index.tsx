import { css, cx } from '@emotion/css';
import { ChangeEventHandler, useCallback, useMemo } from 'react';
import { Color, Duration, FontSize, LineHeight } from '../../constants/Style';
import { makeId } from '../../helpers/String';
import { gutter, textEllipsis, visuallyHidden } from '../../helpers/Style';

type Option<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type Size = 'neutral' | 'small';

type Props<T> = {
  value: T;
  options: Option<T>[];
  onChange: (item: Option<T>, index: number) => void;
  size?: Size;
};

export const Tabs = <T extends string | number>({ value, options, onChange, size = 'neutral' }: Props<T>) => {
  const groupName = useMemo(() => makeId(), []);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      const index = Number(e.currentTarget.value);
      onChange(options[index], index);
    },
    [options, onChange],
  );

  return (
    <ul className={styleBase} role="tablist">
      {options.map((option, index) => (
        <li key={index} role="presentation">
          <label role="presentation" className={styleLabel}>
            <input
              type="radio"
              role="tab"
              className={styleInput}
              name={groupName}
              value={index}
              checked={option.value === value}
              disabled={option.disabled}
              onChange={handleChange}
            />
            <span className={cx(styleInner, styleSize[size])}>{option.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

const styleBase = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;

  > li {
    flex: 1 1 100%;
  }
`;

const styleInput = visuallyHidden();

const styleLabel = css`
  display: block;
`;

const styleInner = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: ${LineHeight.Compressed};
  color: ${Color.TextSub};
  cursor: pointer;
  user-select: none;
  transition: color ${Duration.Fade}, background-color ${Duration.Fade};
  ${textEllipsis()}

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 2px;
    content: '';
    background-color: ${Color.ThemePrimaryDark};
    transition: transform ${Duration.Enter};
    transform: translate3d(0, 100%, 0);
  }

  input:checked + & {
    color: ${Color.TextNeutral};
    cursor: default;

    &:after {
      transform: none;
    }
  }

  input:not(:checked):not(:disabled) + &:hover {
    background-color: ${Color.ThemePrimaryLighter};
  }
`;

const styleSize: Frozen<Size, string> = {
  neutral: css`
    padding: ${gutter(3)} ${gutter(4)};
    font-size: ${FontSize.Regular};
  `,
  small: css`
    padding: ${gutter(2)} ${gutter(3)};
    font-size: ${FontSize.Small};
  `,
};
