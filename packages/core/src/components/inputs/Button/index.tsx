import { css, cx } from '@emotion/css';
import {
  Children,
  useMemo,
  type AriaAttributes,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { BorderRadius, Duration, FontSize } from '../../../constants/Style';
import { cssVar, gutter, square } from '../../../helpers/Style';

type Theme = 'primary' | 'danger';

type Variant = 'solid' | 'ghost' | 'bare';

type Props = Partial<
  {
    id: string;
    /** 使用するバリアント */
    variant: Variant;
    /** ボタンの色 */
    theme: Theme;
    children: ReactNode;
    type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    block: boolean;
    disabled: ButtonHTMLAttributes<HTMLButtonElement>['disabled'];
  } & XOR<
    {
      onClick: (event: MouseEvent<HTMLButtonElement>) => void;
      tabIndex: ButtonHTMLAttributes<HTMLButtonElement>['tabIndex'];
      ref?: RefObject<HTMLButtonElement | null>;
      onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
      /**
       * メニューやダイアログなど、要素によって起動されるインタラクティブなポップアップ要素の有無と種類を示します。
       */
      ariaHaspopup?: AriaAttributes['aria-haspopup'];
      /**
       * 要素、またはそれが制御する別のグループ化要素が現在展開されているか、または折りたたまれているかを示します。
       */
      ariaExpanded?: AriaAttributes['aria-expanded'];
    },
    {
      noop: true;
      ref?: RefObject<HTMLSpanElement | null>;
    }
  >
>;

/**
 * ユーザーがワンタップでアクションを起こしたり選択できる汎用的な UI です。
 */
export const Button = ({
  id,
  variant = 'solid',
  theme = 'primary',
  type,
  children,
  block,
  disabled,
  ref,
  onClick,
  tabIndex,
  onKeyDown,
  ariaHaspopup,
  ariaExpanded,
  noop,
}: Props) => {
  const buttonStyle = useMemo(
    () => cx(styleBase, getVariantStyle(variant, theme), block && styleBlock),
    [variant, block, theme],
  );

  return noop ? (
    <span ref={ref} id={id} className={buttonStyle} aria-disabled={disabled}>
      {Children.toArray(children).map((child) =>
        typeof child === 'string' ? <span key={child}>{child}</span> : child,
      )}
    </span>
  ) : (
    <button
      ref={ref as RefObject<HTMLButtonElement | null>}
      id={id}
      className={buttonStyle}
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {Children.toArray(children).map((child) =>
        typeof child === 'string' ? <span key={child}>{child}</span> : child,
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

function variantSolid(neutral: ReturnType<typeof cssVar>, hover: ReturnType<typeof cssVar>) {
  return `
    color: white;
    background-color: ${neutral};
    border-color: ${neutral};

    > svg {
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
      background-color: ${cssVar('ThemeDisabledNeutral')};
      border-color: ${cssVar('ThemeDisabledNeutral')};
    }
  `;
}

function variantGhost(color: ReturnType<typeof cssVar>, hover: ReturnType<typeof cssVar>) {
  return `
    color: ${color};
    background-color: transparent;
    border-color: ${color};

    > svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled,
    &[aria-disabled='true'] {
      color: ${cssVar('ThemeDisabledNeutral')};
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${cssVar('ThemeDisabledNeutral')};

      > svg {
        fill: ${cssVar('ThemeDisabledNeutral')};
      }
    }
  `;
}

function variantBare(color: ReturnType<typeof cssVar>, hover: ReturnType<typeof cssVar>) {
  return `
    color: ${color};
    background-color: transparent;
    border-color: transparent;

    > svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled,
    &[aria-disabled='true'] {
      color: ${cssVar('ThemeDisabledNeutral')};
      pointer-events: none;
      cursor: not-allowed;

      > svg {
        fill: ${cssVar('ThemeDisabledNeutral')};
      }
    }
  `;
}

const styleBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  padding: 5px ${gutter(6)};
  font-size: ${FontSize.Small};
  line-height: 1.2;
  vertical-align: middle;
  color: white;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  appearance: none;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: ${BorderRadius.Circle};
  transition: background-color ${Duration.Fade};

  > :not(:first-child) {
    margin-left: ${gutter(1)};
  }

  > svg {
    margin-top: -1px;
    margin-bottom: -1px;
    ${square(16)}

    &:first-child:not(:last-child) {
      margin-left: ${gutter(-2)};
    }

    &:last-child:not(:first-child) {
      margin-right: ${gutter(-2)};
    }
  }
`;

const styleSolid: Frozen<Theme, string> = {
  primary: css`
    ${variantSolid(cssVar('ThemePrimaryNeutral'), cssVar('ThemePrimaryDark'))}
  `,
  danger: css`
    ${variantSolid(cssVar('ThemeDangerNeutral'), cssVar('ThemeDangerDark'))}
  `,
};

const styleGhost: Frozen<Theme, string> = {
  primary: css`
    ${variantGhost(cssVar('ThemePrimaryNeutral'), cssVar('ThemePrimaryLight'))}
  `,
  danger: css`
    ${variantGhost(cssVar('ThemeDangerNeutral'), cssVar('ThemeDangerLight'))}
  `,
};

const styleBare: Frozen<Theme, string> = {
  primary: css`
    ${variantBare(cssVar('ThemePrimaryNeutral'), cssVar('ThemePrimaryLight'))}
  `,
  danger: css`
    ${variantBare(cssVar('ThemeDangerNeutral'), cssVar('ThemeDangerLight'))}
  `,
};

const styleBlock = css`
  display: flex;
  width: 100%;
`;
