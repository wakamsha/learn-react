import { css } from '@emotion/css';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { BorderRadius, Duration, FontSize, LineHeight, ZIndex } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';

type Position = 'top' | 'right' | 'bottom' | 'left';

type Alignment = 'start' | 'center' | 'end';

type Point = {
  top: number;
  left: number;
};

type Props = {
  children: ReactNode;
  /**
   * 対象となる要素の ID。
   *
   * @example
   * `my-button`
   */
  targetId: string;
  position?: Position;
  alignment?: Alignment;
  offset?: number;
};

/**
 * ツールチップは、ユーザーが要素にカーソルを合わせたり、フォーカスしたり、タップしたりしたときに、
 * 情報を伝えるテキストを表示します。
 */
export const Tooltip = ({ children, targetId, position = 'bottom', alignment = 'center', offset = 0 }: Props) => {
  const baseRef = useRef<HTMLDivElement>(null);

  const targetElmRef = useRef<HTMLElement>(null);

  const timerIdRef = useRef<number>(null);

  const [shown, setShown] = useState(false);

  const [point, setPoint] = useState<Partial<Point>>({});

  const show = useCallback(
    (targetElement: HTMLElement) => {
      if (!baseRef.current) return;

      setPoint(
        getOptimizedPoint({
          position,
          alignment,
          offset,
          targetElement,
          tooltipElement: baseRef.current,
        }),
      );

      setShown(true);
    },
    [alignment, offset, position],
  );

  const hide = () => {
    setShown(false);
  };

  const handleMouseLeave = useCallback(() => {
    hide();
    window.clearTimeout(timerIdRef.current ?? undefined);
    timerIdRef.current = null;
    targetElmRef.current?.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const schedule = useCallback(() => {
    window.clearTimeout(timerIdRef.current ?? undefined);

    const targetElement = targetElmRef.current;

    if (!targetElement) return;

    timerIdRef.current = window.setTimeout(() => {
      show(targetElement);
    }, 300);
    targetElement.addEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave, show]);

  useEffect(() => {
    // oxlint-disable-next-line prefer-query-selector
    const targetElm = document.getElementById(targetId);

    if (!targetElm) return;

    targetElmRef.current = targetElm;
    targetElm.addEventListener('mouseenter', schedule);

    // target 非活性状態変更時に mouseleave イベントを実行し、当要素を確実に非表示とする。
    const observer: MutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        if ((record.target as HTMLButtonElement).disabled) {
          handleMouseLeave();
        }
      });
    });

    observer.observe(targetElm, {
      attributes: true,
      attributeFilter: ['disabled'],
    });

    return () => {
      targetElm.removeEventListener('mouseenter', schedule);
      observer.disconnect();
    };
  }, [targetId, schedule, handleMouseLeave]);

  return createPortal(
    <div ref={baseRef} role="tooltip" className={styleBase} style={point} aria-hidden={!shown}>
      {children}
    </div>,
    document.querySelector('#app') ?? document.body,
  );
};

function getStyle(element: HTMLElement, styleProp: string): string {
  const { defaultView } = element.ownerDocument;

  return defaultView?.getComputedStyle ? defaultView.getComputedStyle(element, '').getPropertyValue(styleProp) : '';
}

function getAnchorElement(tooltipElement: HTMLDivElement): HTMLElement {
  let parent = tooltipElement.parentNode;

  while (parent && parent !== document.body) {
    const pos = getStyle(parent as HTMLElement, 'position');
    if (pos === 'absolute' || pos === 'relative' || pos === 'fixed') {
      return parent as HTMLElement;
    }
    parent = parent.parentNode as HTMLElement;
  }

  return parent as HTMLElement;
}

function getWrapperElement(srcDOM: Element): HTMLElement {
  if (srcDOM === document.body) return srcDOM as HTMLElement;

  let wrappingElement = srcDOM.parentNode;

  while (wrappingElement && wrappingElement !== document.body) {
    const overflow = getStyle(wrappingElement as HTMLElement, 'overflow');

    if (overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden') {
      return wrappingElement as HTMLElement;
    }

    wrappingElement = wrappingElement.parentNode as HTMLElement;
  }

  return wrappingElement as HTMLElement;
}

function getOptimizedPoint({
  tooltipElement,
  targetElement,
  position: positionProp,
  alignment,
  offset,
}: {
  tooltipElement: HTMLDivElement;
  targetElement: HTMLElement;
} & Required<Pick<Props, 'position' | 'alignment' | 'offset'>>): Point {
  const anchorElement = getAnchorElement(tooltipElement);
  const anchorRect = anchorElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const wrapperRect = getWrapperElement(anchorElement).getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();

  const clearance = {
    top: targetRect.top - tooltipRect.height - wrapperRect.top,
    right: wrapperRect.right - targetRect.right - tooltipRect.width,
    bottom: wrapperRect.bottom - targetRect.bottom - tooltipRect.height,
    left: targetRect.left - tooltipRect.width - wrapperRect.left,
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
          left = targetRect.left - anchorRect.left + (targetRect.width - tooltipRect.width);
          break;
        case 'center':
          left = targetRect.left - anchorRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
      }

      if (left < 0 && anchorRect.left + left < 0 && tooltipRect.width < window.innerWidth) {
        left = 0;
      } else if (window.innerWidth < left + tooltipRect.width) {
        left = window.innerWidth - tooltipRect.width;
      }
      break;

    case 'left':
    case 'right':
      switch (alignment) {
        case 'start':
          top = targetRect.top - anchorRect.top;
          break;
        case 'end':
          top = targetRect.top - anchorRect.top + (targetRect.height - tooltipRect.height);
          break;
        case 'center':
          top = targetRect.top - anchorRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
      }

      if (top < 0 && anchorRect.top + top < 0) {
        top = 0;
      } else if (window.innerHeight < top + tooltipRect.height) {
        top = window.innerHeight - tooltipRect.height;
      }
      break;
  }

  switch (position) {
    case 'top':
      top = targetRect.top - tooltipRect.height - anchorRect.top - offset;
      break;
    case 'right':
      left = targetRect.right - anchorRect.left + offset;
      break;
    case 'bottom':
      top = targetRect.bottom - anchorRect.top + offset;
      break;
    case 'left':
      left = targetRect.left - tooltipRect.width - anchorRect.left - offset;
      break;
  }

  return { top, left };
}

const styleBase = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${ZIndex.Tooltip};
  visibility: hidden;
  max-width: 200px;
  padding: ${gutter(2)};
  font-size: ${FontSize.Tiny};
  line-height: ${LineHeight.Compressed};
  color: white;
  word-break: break-all;
  pointer-events: none;
  user-select: none;
  background-color: ${cssVar('ThemePrimaryNeutral')};
  border-radius: ${BorderRadius.Small};
  opacity: 0;
  transition:
    visibility ${Duration.Fade},
    opacity ${Duration.Fade};

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
  }
`;
