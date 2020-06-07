import { Item } from './Item';
import { Toast } from '.';
import { createPortal } from 'react-dom';
// import { css } from 'emotion';
import React from 'react';
import styled from 'styled-components';

type Props = {
  toasts: Toast[];
};

export const Container = ({ toasts }: Props): JSX.Element =>
  createPortal(
    // <div className={baseStyle}>
    <StyledBase>
      {toasts.map(({ id, content, theme }) => (
        <Item key={id} id={id} theme={theme}>
          {content}
        </Item>
      ))}
    </StyledBase>,
    // </div>,
    document.body,
  );

const StyledBase = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: 16px;
`;

// const baseStyle = css({
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   zIndex: 1,
//   padding: 16,
//   display: 'flex',
//   flexDirection: 'column-reverse',
// });
