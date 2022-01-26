import { css } from '@emotion/css';
import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';

type Props = {
  children: ReactNode;
  size?: number;
};

export const Pane = forwardRef(({ children, size }: Props, ref: ForwardedRef<HTMLDivElement>) => {
  const style = {
    width: size,
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
  outline: none;
`;
