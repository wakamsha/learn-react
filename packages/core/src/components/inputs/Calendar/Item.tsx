import { css } from '@emotion/css';
import { BorderRadius, Color, Duration, FontSize, IconSize } from '../../../constants/Style';
import { square } from '../../../helpers/Style';

type Props = {
  onClick: (value: Date) => void;
  value?: Date;
  active?: boolean;
  disabled?: boolean;
};

export const Item = ({ value, active, disabled, onClick }: Props) => {
  const handleClick = () => {
    !disabled && value && onClick(value);
  };

  return (
    <button
      className={styleBase}
      aria-pressed={active}
      aria-disabled={disabled}
      onClick={handleClick}
      tabIndex={!value || disabled ? -1 : undefined}
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
      background-color: ${Color.ThemePrimaryLighter};
    }
  }

  &[aria-pressed='true'] {
    color: white;
    cursor: default;

    &,
    &:hover {
      background: ${Color.ThemePrimaryDark};
    }
  }

  &[aria-disabled='true'] {
    color: ${Color.ThemeDisabledNeutral};
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }
`;
