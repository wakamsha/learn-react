import { css } from '@emotion/css';
import { ReactNode } from 'react';
import { FancyBorder } from './FancyBorder';

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

export const Dialog = ({ title, message, children }: Props) => (
  <FancyBorder color="blue">
    <h1 className={titleStyle}>{title}</h1>
    <p className={messageStyle}>{message}</p>
    {children}
  </FancyBorder>
);
