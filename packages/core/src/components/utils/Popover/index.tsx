import { css, cx } from '@emotion/css';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Duration, ZIndex } from '../../../constants/Style';

type Position = 'top' | 'right' | 'bottom' | 'left';

type Alignment = 'start' | 'center' | 'end';

type Point = {
  top: number;
  left: number;
};

type Props = {
  /**
   * 対象となる要素の CSS セレクタ。
   * ID 推奨。
   *
   * @example
   * `#my-button`
   */
  targetSelector: string;
  visible: boolean;
  children: ReactNode;
  position?: Position;
  alignment?: Alignment;
  offset?: number;
  width?: number;
  onClickOutside?: () => void;
};

export const Popover = ({
  targetSelector,
  visible,
  children,
  position = 'bottom',
  alignment = 'center',
  offset = 0,
  width = 300,
  onClickOutside,
}: Props) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [point, setPoint] = useState<Partial<Point>>({});

  useEffect(() => {
    if (!popoverRef.current) return;

    if (!visible) return;

    const targetElement = document.querySelector(targetSelector);
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
  }, [position, alignment, targetSelector, visible, width, offset]);

  return createPortal(
    <div role="presentation" className={styleBase} aria-hidden={!visible} onClick={onClickOutside}>
      <div
        role="dialog"
        ref={popoverRef}
        className={stylePopover[position]}
        aria-hidden={!visible}
        aria-modal={visible}
        style={{ width, ...point }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
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
  visibility: hidden;

  &[aria-hidden='false'] {
    visibility: visible;
  }
`;

const stylePopoverBase = css`
  position: absolute;
  z-index: ${ZIndex.Popover};
  min-height: 48px;
  visibility: hidden;
  opacity: 0;
  transition: visibility ${Duration.Fade}, opacity ${Duration.Fade}, transform ${Duration.Fade};

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
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
