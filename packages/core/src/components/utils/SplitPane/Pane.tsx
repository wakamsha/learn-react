import { css } from '@emotion/css';
import { forwardRef, type ComponentProps, type ForwardedRef, type ReactNode } from 'react';
import { type SplitPane } from '.';

type ParentProps = ComponentProps<typeof SplitPane>;

type Props = Required<Pick<ParentProps, 'orientation'>> & {
  children: ReactNode;
  size?: `${number}px` | `${number}%`;
};

/**
 * コンテンツを表示する領域。
 */
export const Pane = forwardRef(({ orientation, children, size }: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const style = {
    ...(orientation === 'horizontal' ? { width: size } : { height: size }),
    flex: size ? 'none' : 1,
  };

  return (
    <div ref={ref} className={styleBase} style={style}>
      {children}
    </div>
  );
});

const styleBase = css`
  position: relative;
  overflow: auto;
  outline: none;
`;
