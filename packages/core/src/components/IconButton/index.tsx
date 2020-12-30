import { css, cx } from '@emotion/css';
import { IconName } from '@learn-react/icon';
import { MouseEvent, useMemo } from 'react';
import { BorderRadius, Color, Duration } from '../../constants/Style';
import { square } from '../../helpers/Style';
import { Icon } from '../Icon';

type Variant = 'solid' | 'ghost' | 'bare';

type Theme = 'primary' | 'danger';

type Size = 'small' | 'neutral';

type Props = {
  name: IconName;
  id?: string;
  variant?: Variant;
  theme?: Theme;
  size?: Size;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const IconButton = ({
  name,
  id,
  variant = 'solid',
  theme = 'primary',
  size = 'neutral',
  disabled,
  onClick,
}: Props) => {
  const styleButton = useMemo(() => cx(styleBase, getStyleVariant(variant, theme), styleSize[size]), [
    theme,
    variant,
    size,
  ]);

  return (
    <button type="button" id={id} className={styleButton} tabIndex={-1} disabled={disabled} onClick={onClick}>
      <Icon name={name} />
    </button>
  );
};

function getStyleVariant(variant: Variant, theme: Theme) {
  switch (variant) {
    case 'solid':
      return styleSolid[theme];
    case 'ghost':
      return styleGhost[theme];
    case 'bare':
      return styleBare[theme];
  }
}

function variantSolid(neutral: Color, hover: Color) {
  return css`
    background-color: ${neutral};
    border-color: ${neutral};

    > svg {
      fill: white;
    }

    &:hover,
    &:active {
      background-color: ${hover};
      border-color: ${hover};
    }

    &:disabled {
      background-color: ${Color.ThemeDisabledNeutral};
      border-color: ${Color.ThemeDisabledNeutral};
    }
  `;
}

function variantGhost(color: Color, hover: Color) {
  return css`
    border-color: ${color};

    > svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled {
      border-color: ${Color.ThemeDisabledNeutral};

      > svg {
        fill: ${Color.ThemeDisabledNeutral};
      }
    }
  `;
}

function variantBare(color: Color, hover: Color) {
  return css`
    > svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled {
      > svg {
        fill: ${Color.ThemeDisabledNeutral};
      }
    }
  `;
}

const styleBase = css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: ${BorderRadius.Circle};
  transition: background-color ${Duration.Fade}, fill ${Duration.Fade}, fill ${Duration.Fade};

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
  }

  &:active {
    transition: none;
  }
`;

const styleSolid: Frozen<Theme, string> = {
  primary: variantSolid(Color.ThemePrimaryNeutral, Color.ThemePrimaryDark),
  danger: variantSolid(Color.ThemeDangerNeutral, Color.ThemeDangerDark),
};

const styleGhost: Frozen<Theme, string> = {
  primary: variantGhost(Color.ThemePrimaryNeutral, Color.ThemePrimaryLighter),
  danger: variantGhost(Color.ThemeDangerNeutral, Color.ThemeDangerLighter),
};

const styleBare: Frozen<Theme, string> = {
  primary: variantBare(Color.ThemePrimaryNeutral, Color.ThemePrimaryLighter),
  danger: variantBare(Color.ThemeDangerNeutral, Color.ThemeDangerLighter),
};

const styleSize: Frozen<Size, string> = {
  neutral: css`
    ${square(32)}

    > svg {
      ${square(24)}
    }
  `,
  small: css`
    ${square(24)}

    > svg {
      ${square(18)}
    }
  `,
};
