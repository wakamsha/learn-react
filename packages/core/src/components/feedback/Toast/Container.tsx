import { css } from '@emotion/css';
import { createPortal } from 'react-dom';
import { useToasts } from '.';
import { gutter } from '../../../helpers/Style';
import { Item } from './Item';

/**
 * トーストが表示される領域を確保します。トーストはこの中に表示されます。
 */
export const Container = () => {
  const toasts = useToasts();

  return createPortal(
    <aside className={styleBase}>
      {toasts.map(({ id, message, icon, theme }) => (
        <Item key={id} id={id} icon={icon} theme={theme}>
          {message}
        </Item>
      ))}
    </aside>,
    document.getElementById('app') || document.body,
  );
};

const styleBase = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column-reverse;
  padding: ${gutter(4)};

  > :not(:first-child) {
    margin-bottom: ${gutter(4)};
  }
`;
