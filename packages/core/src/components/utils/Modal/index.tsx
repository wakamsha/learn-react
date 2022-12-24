import { css } from '@linaria/core';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Color, Duration, Easing, ZIndex } from '../../../constants/Style';
import { gutter, hex2rgba } from '../../../helpers/Style';
import { useFocusTrap } from '../../../hooks/useFocusTrap';

type Props = {
  children: ReactNode;
  /**
   * `true` の場合はモーダルコンテンツを表示する。
   */
  visible: boolean;
  /**
   * コンテンツ領域外をクリックした時に呼ばれるコールバック関数。
   */
  onClickOutside?: () => void;
};

/**
 * モーダルは、ダイアログ、ポップオーバー、ライトボックスなど、
 * ユーザを特定のコンテキストへ強制的にスイッチさせる必要のあるあらゆるものを作成するための基盤を提供します。
 *
 * @param props
 */
export const Modal = ({ children, visible, onClickOutside }: Props) => {
  const dialogRef = useFocusTrap<HTMLDivElement>(visible);

  useEffect(() => {
    const app = document.getElementById('app');
    if (!app) return;

    app.setAttribute('aria-hidden', `${visible}`);

    return () => {
      app.removeAttribute('aria-hidden');
    };
  }, [visible]);

  return createPortal(
    <div role="presentation" className={styleBase} aria-hidden={!visible} tabIndex={-1}>
      <div role="presentation" className={styleInner} onClick={onClickOutside}>
        <div
          role="dialog"
          className={styleContent}
          ref={dialogRef}
          aria-modal={visible}
          aria-hidden={!visible}
          onClick={e => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('app') || document.body,
  );
};

const styleBase = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ZIndex.Modal};
  overflow: auto;
  visibility: hidden;
  background-color: ${hex2rgba(Color.TextureBackdrop.light, 0.8)};
  opacity: 0;
  transition: visibility ${Duration.Enter} ${Easing.Enter}, opacity ${Duration.Enter} ${Easing.Enter};
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);

  @media (prefers-color-scheme: dark) {
    background-color: ${hex2rgba(Color.TextureBackdrop.dark, 0.8)};
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
  }
`;

const styleInner = css`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
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
