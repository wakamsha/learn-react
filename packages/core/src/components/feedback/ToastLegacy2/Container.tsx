import { css } from '@linaria/core';
import { createPortal } from 'react-dom';
import { Toast } from '.';
import { gutter } from '../../../helpers/Style';
import { Item } from './Item';

export const Container = () => {
  const { toasts } = Toast.useToast();

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
