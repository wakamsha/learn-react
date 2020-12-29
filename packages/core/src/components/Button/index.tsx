import { css, cx } from '@emotion/css';
import { ButtonHTMLAttributes, Children, MouseEvent, ReactNode, useMemo } from 'react';
import { BorderRadius, Color, Duration, FontSize } from '../../constants/Style';
import { gutter } from '../../helpers/Style';

type Theme = 'primary' | 'danger';

type Variant = 'solid' | 'ghost' | 'bare';

type Props = Partial<
  {
    variant: Variant;
    theme: Theme;
    children: ReactNode;
    type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled: ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
  } & XOR<
    {
      onClick: (e: MouseEvent<HTMLButtonElement>) => void;
      tabIndex: ButtonHTMLAttributes<HTMLButtonElement>['tabIndex'];
    },
    {
      noop: true;
    }
  >
>;

export const Button = ({
  variant = 'solid',
  theme = 'primary',
  type,
  children,
  disabled,
  onClick,
  tabIndex,
  noop,
}: Props) => {
  const buttonStyle = useMemo(() => cx(styleBase, getVariantStyle(variant, theme)), [variant, theme]);

  return noop ? (
    <span className={buttonStyle} aria-disabled={disabled}>
      {Children.toArray(children).map(child =>
        typeof child === 'string' ? <span key={`${child}`}>{child}</span> : child,
      )}
    </span>
  ) : (
    <button className={buttonStyle} type={type} tabIndex={tabIndex} disabled={disabled} onClick={onClick}>
      {Children.toArray(children).map(child =>
        typeof child === 'string' ? <span key={`${child}`}>{child}</span> : child,
      )}
    </button>
  );
};

function getVariantStyle(variant: Variant, theme: Theme) {
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
    color: white;
    background-color: ${neutral};
    border-color: ${neutral};

    svg {
      fill: white;
    }

    &:hover,
    &:active {
      text-decoration: none;
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: not-allowed;
      background-color: ${Color.ThemeDisabledNeutral};
      border-color: ${Color.ThemeDisabledNeutral};
    }
  `;
}

function variantGhost(color: Color, hover: Color) {
  return css`
    color: ${color};
    background-color: transparent;
    border-color: ${color};

    svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled,
    &[aria-disabled='true'] {
      color: ${Color.ThemeDisabledNeutral};
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${Color.ThemeDisabledNeutral};

      svg {
        fill: ${Color.ThemeDisabledNeutral};
      }
    }
  `;
}

function variantBare(color: Color, hover: Color) {
  return css`
    color: ${color};
    background-color: transparent;
    border-color: transparent;

    svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled,
    &[aria-disabled='true'] {
      color: ${Color.ThemeDisabledNeutral};
      pointer-events: none;
      cursor: not-allowed;

      svg {
        fill: ${Color.ThemeDisabledNeutral};
      }
    }
  `;
}

const styleBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${gutter(3)} ${gutter(6)};
  font-size: ${FontSize.Regular};
  line-height: 1;
  color: white;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: ${BorderRadius.Regular};
  appearance: none;
  transition: background-color ${Duration.Fade};
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
