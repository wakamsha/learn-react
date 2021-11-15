import { css } from '@emotion/css';
import { ReactNode } from 'react';

export type BorderColors = 'blue';

type Props = {
  color: BorderColors;
  children?: ReactNode;
};

const baseStyle = css({
  padding: 10,
  border: `10px solid`,
});

const blueStyle = css({
  borderColor: 'blue',
});

export const FancyBorder = ({ color, children }: Props): JSX.Element => (
  <div className={`${baseStyle} ${color === 'blue' ? blueStyle : ''}`}>{children}</div>
);
