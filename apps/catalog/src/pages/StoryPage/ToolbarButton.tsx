import { css, cx } from '@emotion/css';
import { FontSize, IconSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter, square } from '@learn-react/core/src/helpers/Style';
import {
  forwardRef,
  type AriaAttributes,
  type ButtonHTMLAttributes,
  type ForwardedRef,
  type MouseEvent,
  type ReactNode,
} from 'react';

type Props = {
  children: ReactNode;
  id?: string;
  /**
   * `true` の場合、ボタンにはアクティブ状態を示すスタイルが適用される。
   *
   * @default false
   */
  active?: boolean;
} & XOR<
  {
    tabIndex?: ButtonHTMLAttributes<HTMLButtonElement>['tabIndex'];
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
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
  }
>;

/**
 * ツールバーに表示するためのシンプルなアクションボタン。
 */
export const ToolbarButton = forwardRef(
  (
    { children, id, active = false, tabIndex, onClick, ariaHaspopup, ariaExpanded, noop }: Props,
    ref: ForwardedRef<HTMLSpanElement | HTMLButtonElement>,
  ) => {
    const styleButton = cx(styleBase, active && styleActive);

    return noop ? (
      <span ref={ref} id={id} className={styleButton}>
        {children}
      </span>
    ) : (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        id={id}
        className={styleButton}
        tabIndex={tabIndex}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);

const styleBase = css`
  display: inline-flex;
  align-items: center;
  padding: ${gutter(0.5)};
  font-size: ${FontSize.Tiny};
  color: white;
  appearance: none;
  cursor: pointer;
  user-select: none;
  background-color: ${cssVar('ThemePrimaryDark')};
  border: none;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  > svg {
    ${square(IconSize.Regular)}

    fill: white;
  }
`;

const styleActive = css`
  background-color: ${cssVar('ThemePrimaryDarker')};
  opacity: 1;
`;
