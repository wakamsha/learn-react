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
      {toasts.map(({ id, content }) => (
        <Item key={id} id={id}>
          {content}
        </Item>
      ))}
    </div>,
    document.body,
  );

const baseStyle = css({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  padding: 8,
});
