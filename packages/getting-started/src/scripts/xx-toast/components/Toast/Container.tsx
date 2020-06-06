import { Item } from './Item';
import { Toast } from '.';
import { createPortal } from 'react-dom';
import { css } from 'emotion';
import React from 'react';

type Props = {
  toasts: Toast[];
};

export const Container = ({ toasts }: Props): JSX.Element =>
  createPortal(
    <div className={baseStyle}>
      {toasts.map(({ id, content, theme }) => (
        <Item key={id} id={id} theme={theme}>
          {content}
        </Item>
      ))}
    </div>,
    document.body,
  );

const baseStyle = css({
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: 1,
  padding: 16,
  display: 'flex',
  flexDirection: 'column-reverse',
});
