import { css } from '@emotion/css';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Color, Duration, Easing, ZIndex } from '../../../constants/Style';
import { FOCUSABLE_ELEMENTS } from '../../../constants/VO';
import { gutter, hex2rgba } from '../../../helpers/Style';

type Props = {
  children: ReactNode;
  visible: boolean;
  onClickOutside?: () => void;
};

export const Modal = ({ children, visible, onClickOutside }: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  /**
   * Tab キーによるフォーカス移動のスコープをダイアログ要素配下に限定する。
   */
  const retainFocus = useCallback((event: KeyboardEvent) => {
    if (!dialogRef.current) return;

    const focusableNodes = getFocusableNodes(dialogRef.current).filter(node => node.offsetParent !== null);

    if (!focusableNodes.length) return;

    if (!dialogRef.current.contains(document.activeElement)) {
      focusableNodes[0].focus();
    } else {
      const focusedItemIndex = focusableNodes.indexOf(document.activeElement as any);

      if (event.shiftKey && focusedItemIndex === 0) {
        focusableNodes[focusableNodes.length - 1].focus();
        event.preventDefault();
      }

      if (!event.shiftKey && focusableNodes.length > 0 && focusedItemIndex === focusableNodes.length - 1) {
        focusableNodes[0].focus();
        event.preventDefault();
      }
    }
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        retainFocus(event);
      }
    },
    [retainFocus],
  );

  useEffect(() => {
    const app = document.getElementById('app');
    if (!app) return;

    app.setAttribute('aria-hidden', `${visible}`);

    if (visible) {
      document.addEventListener('keydown', onKeyDown);
      (document.activeElement as HTMLElement)?.blur();
    }

    return () => {
      app.removeAttribute('aria-hidden');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown, retainFocus, visible]);

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
    document.body,
  );
};

/**
 * 任意の DOM 配下にあるフォーカス可能な DOM 要素を取得します。
 *
 * @param {HTMLElement} scopeElement
 * @returns フォーカス可能な DOM 要素配列
 */
function getFocusableNodes(scopeElement: HTMLElement): HTMLElement[] {
  const nodes = scopeElement.querySelectorAll(FOCUSABLE_ELEMENTS.join(','));

  return Array(...nodes) as HTMLElement[];
}

const styleBase = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ZIndex.Modal};
  overflow: auto;
  visibility: hidden;
  background-color: ${hex2rgba(Color.TextureBackdrop, 0.8)};
  opacity: 0;
  transition: visibility ${Duration.Enter} ${Easing.Enter}, opacity ${Duration.Enter} ${Easing.Enter};
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);

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
