import * as React from 'react';
import { BorderColors, FancyBorder } from './FancyBorder';
import { css } from 'emotion';

type Props = {
  title: string;
  message: string;
  children?: React.ReactNode;
};

const titleStyle = css({
  margin: 0,
  fontFamily: 'sans-serif',
});

const messageStyle = css({
  fontSize: 'larger',
});

export function Dialog(props: Props) {
  return (
    <FancyBorder color={BorderColors.blue}>
      <h1 className={titleStyle}>{props.title}</h1>
      <p className={messageStyle}>{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}
