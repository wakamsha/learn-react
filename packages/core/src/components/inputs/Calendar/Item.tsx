import { css } from '@emotion/css';
import { BorderRadius, Duration, FontSize, IconSize } from '../../../constants/Style';
import { cssVar, square } from '../../../helpers/Style';

type Props = {
  onClick: (value: Date) => void;
  value?: Date;
  active?: boolean;
  disabled?: boolean;
};

/**
 * カレンダーの日にち部分を表現する UI コンポーネントです。
 */
export const Item = ({ value, active, disabled, onClick }: Props) => {
  const handleClick = () => {
    if (!disabled && value) {
      onClick(value);
    }
  };

  return (
    <button
      className={styleBase}
      aria-pressed={active}
      aria-disabled={disabled}
      tabIndex={!value || disabled ? -1 : undefined}
      onClick={handleClick}
    >
      {value ? value.getDate() : null}
    </button>
  );
};

const styleBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${FontSize.Small};
  line-height: 1;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: none;
  border-radius: ${BorderRadius.Circle};
  ${square(IconSize.Huge)}

  &:not(:empty) {
    cursor: pointer;
    transition: background-color ${Duration.Fade};

    &:hover {
      background-color: ${cssVar('ThemePrimaryLight')};
    }
  }

  &[aria-pressed='true'] {
    color: white;
    cursor: default;

    &,
    &:hover {
      background-color: ${cssVar('ThemePrimaryDark')};
    }
  }

  &[aria-disabled='true'] {
    color: ${cssVar('ThemeDisabledNeutral')};
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }
`;
