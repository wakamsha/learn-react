import { css } from '@emotion/css';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Color, Duration, Easing, ZIndex } from '../../../constants/Style';
import { gutter, toRGBA } from '../../../helpers/Style';

type Props = {
  children: ReactNode;
  visible: boolean;
  onClickOutside?: () => void;
};

export const Modal = ({ children, visible, onClickOutside }: Props) =>
  createPortal(
    <div role="presentation" className={styleBase} aria-hidden={!visible} tabIndex={-1}>
      <div role="presentation" className={styleInner} onClick={onClickOutside}>
        <div
          role="dialog"
          className={styleContent}
          aria-modal={visible}
          aria-hidden={!visible}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );

const styleBase = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ZIndex.Modal};
  overflow: auto;
  visibility: hidden;
  background-color: ${toRGBA(Color.TextureBackdrop, 0.8)};
  opacity: 0;
  transition: visibility ${Duration.Enter} ${Easing.Enter}, opacity ${Duration.Enter} ${Easing.Enter};
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
  }
`;

const styleInner = css`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: ${gutter(10)} 0;
`;

const styleContent = css`
  margin: auto;
  transition: transform ${Duration.Enter} ${Easing.Enter};
  transform: translate3d(0, -24px, 0);

  &[aria-hidden='false'] {
    transform: translate3d(0, 0, 0);
  }
`;
