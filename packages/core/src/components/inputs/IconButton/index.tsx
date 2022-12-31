import type { IconName } from '@learn-react/icon';
import { css, cx } from '@linaria/core';
import type { AriaAttributes, ForwardedRef, KeyboardEvent, MouseEvent } from 'react';
import { forwardRef, useMemo } from 'react';
import { BorderRadius, Duration } from '../../../constants/Style';
import { cssVar, square } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';

type Variant = 'solid' | 'ghost' | 'bare';

type Theme = 'primary' | 'danger';

type Size = 'small' | 'neutral';

type Props = {
  /** 表示するアイコン名。 */
  name: IconName;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  /** 使用するバリアント。 */
  variant?: Variant;
  /** ボタンの色。 */
  theme?: Theme;
  size?: Size;
  /** アクセシビリティのために指定するラベルです。 */
  ariaLabel?: AriaAttributes['aria-label'];
  disabled?: boolean;
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
  /**
   * メニューやダイアログなど、要素によって起動されるインタラクティブなポップアップ要素の有無と種類を示します。
   */
  ariaHaspopup?: AriaAttributes['aria-haspopup'];
  /**
   * 要素、またはそれが制御する別のグループ化要素が現在展開されているか、または折りたたまれているかを示します。
   */
  ariaExpanded?: AriaAttributes['aria-expanded'];
};

/**
 * アプリバーやツールバーでよく見られる省スペースのボタン UI です。
 *
 * アイテムに星をつけたり外したりするような、一つの選択肢を選択したり外したりするトグルボタンには
 * アイコンボタンが適しています。
 *
 * @param props
 */
export const IconButton = forwardRef(
  (
    {
      name,
      id,
      variant = 'solid',
      theme = 'primary',
      size = 'neutral',
      ariaLabel,
      disabled,
      tabIndex = -1,
      onClick,
      onKeyDown,
      ariaHaspopup,
      ariaExpanded,
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const styleButton = useMemo(
      () => cx(styleBase, getVariantStyle(variant, theme), styleSize[size]),
      [theme, variant, size],
    );

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        id={id}
        className={styleButton}
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
      >
        <Icon name={name} />
      </button>
    );
  },
);

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
      background-color: ${cssVar('ThemeDisabledNeutral')};
      border-color: ${cssVar('ThemeDisabledNeutral')};
    }
  `;
}

function variantGhost(color: ReturnType<typeof cssVar>, hover: ReturnType<typeof cssVar>) {
  return `
    border-color: ${color};

    > svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled {
      border-color: ${cssVar('ThemeDisabledNeutral')};

      > svg {
        fill: ${cssVar('ThemeDisabledNeutral')};
      }
    }
  `;
}

function variantBare(color: ReturnType<typeof cssVar>, hover: ReturnType<typeof cssVar>) {
  return `
    > svg {
      fill: ${color};
    }

    &:hover {
      background-color: ${hover};
    }

    &:disabled {
      > svg {
        fill: ${cssVar('ThemeDisabledNeutral')};
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
