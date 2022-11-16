import { css } from '@linaria/core';
import type { ComponentProps, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import type { SplitPane } from '.';

type ParentProps = ComponentProps<typeof SplitPane>;

type Props = Required<Pick<ParentProps, 'orientation'>> & {
  children: ReactNode;
  size?: number;
};

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
