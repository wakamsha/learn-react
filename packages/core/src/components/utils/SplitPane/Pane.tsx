import { css } from '@emotion/css';
import { type ComponentProps, type ReactNode, type RefObject } from 'react';
import { type SplitPane } from '.';

type ParentProps = ComponentProps<typeof SplitPane>;

type Props = Required<Pick<ParentProps, 'orientation'>> & {
  children: ReactNode;
  ref: RefObject<HTMLDivElement | null>;
  size?: `${number}px` | `${number}%`;
};

/**
 * コンテンツを表示する領域。
 */
export const Pane = ({ orientation, children, ref, size }: Props) => {
  const style = {
    ...(orientation === 'horizontal' ? { width: size } : { height: size }),
    flex: size ? 'none' : 1,
  };

  return (
    <div ref={ref} className={styleBase} style={style}>
      {children}
    </div>
  );
};

const styleBase = css`
  position: relative;
  overflow: auto;
  outline: none;
`;
