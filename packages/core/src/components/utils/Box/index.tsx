import { css } from '@linaria/core';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  orientation: 'horizontal' | 'vertical';
};

export const Box = ({ children, orientation }: Props) => (
  <div className={styleBase} aria-orientation={orientation}>
    {children}
  </div>
);

const styleBase = css`
  display: flex;

  &[aria-orientation='horizontal'] {
    max-width: 100%;
  }

  &[aria-orientation='vertical'] {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

type CellType = 'shrunk' | 'filled';

type CellProps = {
  children: ReactNode;
  type?: CellType;
};

Box.Cell = ({ children, type = 'shrunk' }: CellProps) => <div className={styleCell[type]}>{children}</div>;

const styleCell: Frozen<CellType, string> = {
  shrunk: css`
    flex: 0 0 auto;
  `,
  filled: css`
    flex: 1 1 100%;
    overflow: auto;
  `,
};
