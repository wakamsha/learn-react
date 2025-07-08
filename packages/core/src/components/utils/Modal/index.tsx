import { css } from '@emotion/css';
import { useEffect, type ReactNode } from 'react';
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
 */
export const Modal = ({ children, visible, onClickOutside }: Props) => {
  const dialogRef = useFocusTrap<HTMLDivElement>(visible);

  useEffect(() => {
    // モーダル表示時にページ全体をスクロールロックする。
    document.documentElement.style.overflow = visible ? 'hidden' : '';
    document.documentElement.style.scrollbarGutter = visible ? 'stable' : '';

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
    };
  }, [visible]);

  return createPortal(
    <div role="presentation" className={styleBase} aria-hidden={!visible} tabIndex={-1}>
      <div role="presentation" className={styleInner} onClick={onClickOutside}>
        <div
          ref={dialogRef}
          role="dialog"
          className={styleContent}
          aria-modal={visible}
          aria-hidden={!visible}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

const styleBase = css`
  position: fixed;
  inset: 0;
  z-index: ${ZIndex.Modal};
  visibility: hidden;
  overflow: auto;
  background-color: ${hex2rgba(Color.TextureBackdrop.light, 0.8)};
  opacity: 0;
  backdrop-filter: blur(8px);
  transition:
    visibility ${Duration.Enter} ${Easing.Enter},
    opacity ${Duration.Enter} ${Easing.Enter};

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
  transform: translate3d(0, -24px, 0);
  transition: transform ${Duration.Enter} ${Easing.Enter};

  &[aria-hidden='false'] {
    transform: translate3d(0, 0, 0);
  }
`;
