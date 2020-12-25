import { css } from '@emotion/css';
import { createPortal } from 'react-dom';
import { Item } from './Item';
import { Toast } from '.';

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

const baseStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: 16px;
`;
