import * as React from 'react';
import { css } from 'emotion';

export type BorderColors = 'blue';

type Props = {
  color: BorderColors;
  children?: React.ReactNode;
};

const baseStyle = css({
  padding: 10,
  border: `10px solid`,
});

const blueStyle = css({
  borderColor: 'blue',
});

export function FancyBorder({ color, children }: Props): JSX.Element {
  return <div className={`${baseStyle} ${color === 'blue' ? blueStyle : ''}`}>{children}</div>;
}
