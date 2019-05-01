import * as React from 'react';
import { css } from 'emotion';

export enum BorderColors {
  blue,
}

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

export function FancyBorder(props: Props): JSX.Element {
  return <div className={`${baseStyle} ${props.color === BorderColors.blue ? blueStyle : ''}`}>{props.children}</div>;
}
