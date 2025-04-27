import { css, cx } from '@emotion/css';
import { Card } from '@learn-react/core/src/components/surfaces/Card';
import { Duration, FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { type ComponentProps, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  active: boolean;
};

/**
 * ListMenu コンポーネントは、リストメニューのコンテナを提供します。
 *
 * @example
 * ```
 * <ListMenu>
 *   <ListMenu.Item selected={true}>Item 1</ListMenu.Item>
 *   <ListMenu.Item selected={false}>Item 2</ListMenu.Item>
 *   <ListMenu.Item selected={true}>Item 3</ListMenu.Item>
 * </ListMenu>
 * ```
 */
export const ListMenu = ({ children, active }: Props) => (
  <Card shadow="floating">
    <ul role="menu" aria-hidden={!active}>
      {children}
    </ul>
  </Card>
);

const GapSize = {
  Small: gutter(2),
  Medium: gutter(4),
} as const;

type GapSize = keyof typeof GapSize;

type ItemProps = {
  selected: boolean;
  /**
   * 子要素間の間隔を指定します。
   *
   * @default GapSize.Small
   */
  gap?: GapSize;
} & Pick<ComponentProps<'button'>, 'ref' | 'tabIndex' | 'role' | 'onClick' | 'onKeyDown' | 'children'>;

/**
 * ListMenu.Item コンポーネントは、リストメニューのアイテムを提供します。
 *
 * @example
 * ```
 * <ListMenu>
 *   <ListMenu.Item selected={true}>Item 1</ListMenu.Item>
 *   <ListMenu.Item selected={false}>Item 2</ListMenu.Item>
 * </ListMenu>
 * ```
 */
ListMenu.Item = ({ selected, gap = 'Small', children, ref, tabIndex, role, onClick, onKeyDown }: ItemProps) => (
  <li>
    <button
      ref={ref}
      tabIndex={tabIndex}
      role={role}
      className={cx(StyleMenuItem[gap], selected && styleMenuItemSelected)}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  </li>
);

const styleMenuItemBase = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${gutter(1)} ${gutter(4)};
  font-size: ${FontSize.Small};
  font-weight: bold;
  color: ${cssVar('TextNeutral')};
  text-align: left;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
  transition: background-color ${Duration.Fade};

  &:hover {
    color: white;
    background-color: ${cssVar('ThemePrimaryDark')};
  }

  &:focus {
    color: white;
    background-color: ${cssVar('ThemePrimaryNeutral')};
  }

  &:focus-visible {
    outline: none;
  }
`;

const StyleMenuItem: Frozen<GapSize, string> = {
  Small: cx(
    styleMenuItemBase,
    css`
      gap: ${GapSize.Small};
    `,
  ),
  Medium: cx(
    styleMenuItemBase,
    css`
      gap: ${GapSize.Medium};
    `,
  ),
};

const styleMenuItemSelected = css`
  color: white;
  cursor: default;
  background-color: ${cssVar('ThemePrimaryNeutral')};
`;
