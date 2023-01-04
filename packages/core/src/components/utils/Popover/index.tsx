import { css, cx } from '@linaria/core';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Duration, ZIndex } from '../../../constants/Style';
import { isVisibleScrollbarOf, scrollbarSize } from '../../../helpers/Browser';
import { useFocusTrap } from '../../../hooks/useFocusTrap';

type Position = 'top' | 'right' | 'bottom' | 'left';

type Alignment = 'start' | 'center' | 'end';

type Point = {
  top: number;
  left: number;
};

type Props = {
  /**
   * 対象となる要素の ID。
   *
   * @example
   * `my-button`
   */
  targetId: string;
  /**
   * `true` の場合はポップオーバーを表示する。
   */
  visible: boolean;
  children: ReactNode;
  position?: Position;
  alignment?: Alignment;
  offset?: number;
  /**
   * ポップオーバー領域外をクリックした時に呼ばれるコールバック関数。
   */
  onClickOutside?: () => void;
};

/**
 * ポップオーバーは、あるコンテンツの上に別のコンテンツを表示するために使用する UI です。
 *
 * @param props
 */
export const Popover = ({
  targetId,
  visible,
  children,
  position = 'bottom',
  alignment = 'center',
  offset = 0,
  onClickOutside,
}: Props) => {
  const popoverRef = useFocusTrap<HTMLDivElement>(visible);

  const [point, setPoint] = useState<Partial<Point>>({});

  useEffect(() => {
    if (!popoverRef.current) return;

    if (!visible) return;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    setPoint(
      getOptimizedPoint({
        position,
        alignment,
        offset,
        popoverElement: popoverRef.current,
        targetElement: targetElement as HTMLElement,
      }),
    );
  }, [position, alignment, targetId, visible, offset, popoverRef]);

  useEffect(() => {
    // モーダル表示時にページ全体のスクロールを無効化する。
    if (visible && isVisibleScrollbarOf()) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = `${scrollbarSize()}px`;
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
  }, [visible]);

  return createPortal(
    <div role="presentation" className={styleBase} aria-hidden={!visible} onClick={onClickOutside}>
      <div
        role="dialog"
        ref={popoverRef}
        className={stylePopover[position]}
        aria-hidden={!visible}
        aria-modal={visible}
        style={{ ...point }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('app') || document.body,
  );
};

function getStyle(element: HTMLElement, styleProp: string) {
  const { defaultView } = element.ownerDocument || document;

  return defaultView?.getComputedStyle ? defaultView.getComputedStyle(element, '').getPropertyPriority(styleProp) : '';
}

function getAnchorElement(popoverElement: HTMLElement): HTMLElement {
  let anchorElement = popoverElement.parentNode as HTMLElement;

  while (anchorElement && anchorElement !== document.body) {
    const pos = getStyle(anchorElement, 'position');
    if (pos === 'absolute' || pos === 'relative' || pos === 'fixed') {
      return anchorElement;
    }
    anchorElement = anchorElement.parentNode as HTMLElement;
  }

  return anchorElement;
}

function getWrapperElement(srcDOM: Element): HTMLElement {
  if (srcDOM === document.body) return srcDOM as HTMLElement;

  let wrappingElement = srcDOM.parentNode as HTMLElement;

  while (wrappingElement && wrappingElement !== document.body) {
    const overflow = getStyle(wrappingElement, 'overflow');

    if (overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden') {
      return wrappingElement;
    }

    wrappingElement = wrappingElement.parentNode as HTMLElement;
  }

  return wrappingElement;
}

function getOptimizedPoint({
  popoverElement,
  targetElement,
  position: positionProp,
  alignment,
  offset,
}: {
  popoverElement: HTMLDivElement;
  targetElement: HTMLElement;
} & Required<Pick<Props, 'position' | 'alignment' | 'offset'>>): Point {
  const anchorElement = getAnchorElement(popoverElement);
  const anchorRect = anchorElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const wrapperRect = getWrapperElement(anchorElement).getBoundingClientRect();
  const popoverRect = popoverElement.getBoundingClientRect();

  const clearance = {
    top: targetRect.top - popoverRect.height - wrapperRect.top,
    right: wrapperRect.right - targetRect.right - popoverRect.width,
    bottom: wrapperRect.bottom - targetRect.bottom - popoverRect.height,
    left: targetRect.left - popoverRect.width - wrapperRect.left,
  };

  let position = positionProp;

  switch (position) {
    case 'top':
      if (clearance.top < 0 && clearance.bottom > clearance.top) {
        position = 'bottom';
      }
      break;
    case 'right':
      if (clearance.right < 0 && clearance.left > clearance.right) {
        position = 'left';
      }
      break;
    case 'bottom':
      if (clearance.bottom < 0 && clearance.top > clearance.bottom) {
        position = 'top';
      }
      break;
    case 'left':
      if (clearance.left < 0 && clearance.right > clearance.left) {
        position = 'right';
      }
      break;
  }

  let top = 0;
  let left = 0;

  switch (position) {
    case 'top':
    case 'bottom':
      switch (alignment) {
        case 'start':
          left = targetRect.left - anchorRect.left;
          break;
        case 'end':
          left = targetRect.left - anchorRect.left + (targetRect.width - popoverRect.width);
          break;
        case 'center':
          left = targetRect.left - anchorRect.left + (targetRect.width - popoverRect.width) / 2;
          break;
      }

      if (left < 0 && anchorRect.left + left < 0 && popoverRect.width < window.innerWidth) {
        left = 0;
      } else if (window.innerWidth < left + popoverRect.width) {
        left = window.innerWidth - popoverRect.width;
      }
      break;

    case 'left':
    case 'right':
      switch (alignment) {
        case 'start':
          top = targetRect.top - anchorRect.top;
          break;
        case 'end':
          top = targetRect.top - anchorRect.top + (targetRect.height - popoverRect.height);
          break;
        case 'center':
          top = targetRect.top - anchorRect.top + (targetRect.height - popoverRect.height) / 2;
          break;
      }

      if (top < 0 && anchorRect.top + top < 0) {
        top = 0;
      } else if (window.innerHeight < top + popoverRect.height) {
        top = window.innerHeight - popoverRect.height;
      }
      break;
  }

  switch (position) {
    case 'top':
      top = targetRect.top - popoverRect.height - anchorRect.top - offset;
      break;
    case 'right':
      left = targetRect.right - anchorRect.left + offset;
      break;
    case 'bottom':
      top = targetRect.bottom - anchorRect.top + offset;
      break;
    case 'left':
      left = targetRect.left - popoverRect.width - anchorRect.left - offset;
      break;
  }

  return { top, left };
}

const styleBase = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ZIndex.Popover - 1};
  pointer-events: none;
  opacity: 0;
  transition: opacity ${Duration.Fade};

  &[aria-hidden='false'] {
    pointer-events: auto;
    opacity: 1;
  }
`;

const stylePopoverBase = css`
  position: absolute;
  z-index: ${ZIndex.Popover};
  min-height: 48px;
  pointer-events: none;
  transition: transform ${Duration.Fade};

  &[aria-hidden='false'] {
    pointer-events: auto;
    transform: translate3d(0, 0, 0);
  }
`;

const stylePopover: Record<Position, string> = {
  top: cx(
    stylePopoverBase,
    css`
      transform: translate3d(0, 8px, 0);
    `,
  ),
  right: cx(
    stylePopoverBase,
    css`
      transform: translate3d(-8px, 0, 0);
    `,
  ),
  bottom: cx(
    stylePopoverBase,
    css`
      transform: translate3d(0, -8px, 0);
    `,
  ),
  left: cx(
    stylePopoverBase,
    css`
      transform: translate3d(8px, 0, 0);
    `,
  ),
};
