import { css } from '@emotion/css';
import { forwardRef, ReactNode, RefObject } from 'react';

type Props = {
  children: ReactNode;
  size?: number;
};

export const Pane = forwardRef(({ children, size }: Props, ref: RefObject<HTMLDivElement>) => {
  const style = {
    width: size,
    flex: size ? 'none' : 1,
  };

  return (
    <div role="presentation" ref={ref} className={styleBase} style={style}>
      {children}
    </div>
  );
});

const styleBase = css`
  position: relative;
  outline: none;
`;
