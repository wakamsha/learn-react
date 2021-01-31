import { css } from '@emotion/css';
import { createPortal } from 'react-dom';
import { gutter } from '../../../helpers/Style';
import { Item } from './Item';
import { Toast } from '.';

type Props = {
  toasts: Toast[];
};

export const Container = ({ toasts }: Props) =>
  createPortal(
    <aside className={styleBase}>
      {toasts.map(({ id, content, theme }) => (
        <Item key={id} id={id} theme={theme}>
          {content}
        </Item>
      ))}
    </aside>,
    document.body,
  );

const styleBase = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: ${gutter(4)};
`;
