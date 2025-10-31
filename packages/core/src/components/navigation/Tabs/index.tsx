import { css, cx } from '@emotion/css';
import { useId, type ChangeEvent } from 'react';
import { Duration, FontSize, LineHeight } from '../../../constants/Style';
import { cssVar, gutter, textEllipsis, visuallyHidden } from '../../../helpers/Style';

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

/**
 * タブは、関連する同じレベルの階層にあるコンテンツのグループを整理し、その間を行き来できるようにする UI です。
 */
export const Tabs = <T extends string | number>({ value, options, onChange, size = 'neutral' }: Props<T>) => {
  const groupName = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.currentTarget.value);
    onChange(options[index], index);
  };

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
              aria-selected={option.value === value}
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
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: ${LineHeight.Regular};
  color: ${cssVar('TextSub')};
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid transparent;
  box-shadow: none;
  transition:
    color ${Duration.Fade},
    background-color ${Duration.Fade},
    border-color ${Duration.Fade},
    box-shadow ${Duration.Fade};
  ${textEllipsis()}

  input:checked + & {
    color: ${cssVar('TextNeutral')};
    cursor: default;
    border-bottom-color: ${cssVar('ThemePrimaryDark')};
    box-shadow: inset 0 -1px 0 0 ${cssVar('ThemePrimaryDark')};
  }

  input:not(:checked, :disabled) + &:hover {
    background-color: ${cssVar('ThemePrimaryLight')};
  }
`;

const styleSize: Frozen<Size, string> = {
  neutral: css`
    padding: ${gutter(3.5)} ${gutter(4)} ${gutter(3)};
    font-size: ${FontSize.Regular};
  `,
  small: css`
    padding: ${gutter(2.5)} ${gutter(3)} ${gutter(2)};
    font-size: ${FontSize.Small};
  `,
};
