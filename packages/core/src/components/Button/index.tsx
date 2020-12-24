import { css, cx } from 'emotion';
import { ButtonHTMLAttributes, MouseEvent, ReactNode, useMemo } from 'react';

type Theme = 'neutral' | 'inverse';

type Props = Partial<
  {
    theme: Theme;
    ghost: boolean;
    type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children: ReactNode;
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

export const Button = ({ theme = 'neutral', ghost, type, children, disabled, onClick, tabIndex, noop }: Props) => {
  const buttonStyle = useMemo(() => cx(baseStyle, ThemeStyle[theme], ghost && GhostStyle[theme]), [theme, ghost]);

  return noop ? (
    <span className={buttonStyle} aria-disabled={disabled}>
      {children}
    </span>
  ) : (
    <button className={buttonStyle} type={type} tabIndex={tabIndex} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

function variantFill(color: string): string {
  return css`
    color: white;
    background-color: ${color};
    border-color: ${color};
  `;
}

function variantGhost(color: string): string {
  return css`
    color: ${color};
    background-color: transparent;
    border-color: ${color};
  `;
}

const baseStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  font-size: 16px;
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
  border-radius: 4px;
  appearance: none;

  &:hover {
    opacity: 0.7;
  }
`;

const ThemeStyle: Record<Theme, string> = {
  neutral: variantFill('#7e808c'),
  inverse: variantFill('#D2397C'),
} as const;

const GhostStyle: Record<Theme, string> = {
  neutral: variantGhost('#7e808c'),
  inverse: variantGhost('#D2397C'),
} as const;
