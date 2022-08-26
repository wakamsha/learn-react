import type { IconName } from '@learn-react/icon';
import { iconElements } from '@learn-react/icon';

type Props = {
  name: IconName;
};

/**
 * 単色のアイコンを表示します。
 *
 * @remarks
 * このコンポーネントはシンプルな svg 要素としてレンダリングされるため、
 * スタイルの指定は全て呼び出し側となる親要素側で行います。
 *
 * @param {Props} props
 *
 * @example
 * ```tsx
 * <div className={styleParent}>
 *   ...
 *   <Icon name="plus" />
 * </div>
 *
 * const styleParent = css`
 *   width: 240px;
 *   ...
 *
 *   > svg {
 *     width: 24px;
 *     height: 24px;
 *     fill: red;
 *   }
 * `;
 * ```
 */
export const Icon = ({ name }: Props) => iconElements[name];
