import { css } from '@emotion/css';
import { type FC, type ReactNode, useEffect, useRef } from 'react';
import { Color, Duration, Easing } from '../../../constants/Style';
import { hex2rgba } from '../../../helpers/Style';

type Props = {
  children: ReactNode;
  /**
   * Whether the modal is open or closed.
   */
  open: boolean;
  /**
   * Callback function to be called when the modal is dismissed by clicking outside of it or pressing the Escape key.
   */
  onLightDismiss?: () => void;
};

/**
 * Modal component that uses the HTML dialog element.
 */
export const Modal: FC<Props> = ({ children, open, onLightDismiss }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closedBy = onLightDismiss ? 'any' : 'none';

  // dialog 要素の表示・非表示を制御する
  useEffect(() => {
    if (!dialogRef.current) return;

    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  // モーダル表示時にページ全体をスクロールロックする
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.documentElement.style.scrollbarGutter = open ? 'stable' : '';

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
    };
  }, [open]);

  // Light dismiss 有効時の背景領域クリックや Escape キーでの閉じる処理を設定する
  useEffect(() => {
    if (!dialogRef.current) return;

    const node = dialogRef.current;

    const handleCancel = (event: Event) => {
      if (event.target !== node) return;
      event.preventDefault();
      onLightDismiss?.();
    };

    node.addEventListener('cancel', handleCancel);

    return () => {
      node.removeEventListener('cancel', handleCancel);
    };
  }, [onLightDismiss]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line react/no-unknown-property
    <dialog ref={dialogRef} className={styleBase} closedby={closedBy}>
      {children}
    </dialog>
  );
};

const styleBase = css`
  padding: 0;
  background-color: transparent;
  border: none;
  animation: fade-out ${Duration.Enter} ${Easing.Enter};

  &::backdrop {
    background-color: ${hex2rgba(Color.TextureBackdrop.light, 0.8)};
    backdrop-filter: blur(8px);

    @media (prefers-color-scheme: dark) {
      background-color: ${hex2rgba(Color.TextureBackdrop.dark, 0.8)};
    }
  }

  &[open] {
    animation: fade-in ${Duration.Enter} ${Easing.Enter};
  }

  &[open]::backdrop {
    animation: backdrop-fade-in ${Duration.Enter} ${Easing.Enter};
  }

  @keyframes fade-in {
    0% {
      display: none;
      opacity: 0;
      transform: scale(0.9);
    }

    100% {
      display: block;
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes backdrop-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;
