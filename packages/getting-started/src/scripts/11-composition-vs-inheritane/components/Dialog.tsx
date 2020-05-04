import { FancyBorder } from './FancyBorder';
import { css } from 'emotion';
import React from 'react';

type Props = {
  title: string;
  message: string;
  children?: ReactNode;
};

const titleStyle = css({
  margin: 0,
  fontFamily: 'sans-serif',
});

const messageStyle = css({
  fontSize: 'larger',
});

export function Dialog({ title, message, children }: Props) {
  return (
    <FancyBorder color="blue">
      <h1 className={titleStyle}>{title}</h1>
      <p className={messageStyle}>{message}</p>
      {children}
    </FancyBorder>
  );
}
