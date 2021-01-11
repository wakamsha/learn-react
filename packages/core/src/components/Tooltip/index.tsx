import { css } from '@emotion/css';
import merge from 'ramda/es/merge';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BorderRadius, Color, Duration, FontSize, LineHeight, ZIndex } from '../../constants/Style';
import { Horizontal, Vertical } from '../../constants/VO';
import { gutter } from '../../helpers/Style';

type Props = {
  children: ReactNode;
  /**
   * 対象となる要素の CSS セレクタ。
   * ID 推奨。
   *
   * @example
   * `#my-button`
   */
  targetSelector: string;
  position?: Partial<{
    vertical: Vertical;
    horizontal: Horizontal;
  }>;
  offset?: Partial<{
    top: number;
    left: number;
  }>;
};

export const Tooltip = ({
  children,
  targetSelector,
  position: pos = {},
  offset: { top: offsetTop = 0, left: offsetLeft = 0 } = {},
}: Props) => {
  const baseRef = useRef<HTMLDivElement>(null);

  const targetElmRef = useRef<HTMLElement>();

  const timerIdRef = useRef<number>();

  const position = merge({ horizontal: 'center', vertical: 'bottom' }, pos);

  const show = (targetRect: ClientRect) => {
    if (!baseRef.current) return;

    const anchorRect = getAnchorElement(baseRef.current).getBoundingClientRect();

    const offsetX = (() => {
      switch (position.horizontal) {
        case 'left':
          return 0;
        case 'right':
          return targetRect.width - baseRef.current.getBoundingClientRect().width;
        default:
          return (targetRect.width - baseRef.current.getBoundingClientRect().width) / 2;
      }
    })();

    const offsetY = (() => {
      switch (position.vertical) {
        case 'top':
          return baseRef.current.getBoundingClientRect().height * -1 - 4;
        default:
          return targetRect.height + 4;
      }
    })();

    window.requestAnimationFrame(() => {
      if (baseRef.current) {
        baseRef.current.classList.add(styleActive);
        // @TODO JSXのattributeとしてstyleを操作すると、
        // どういうわけかuseEffectが強制実行されてイベントリスナーが重複登録されるため
        // やむを得ずref経由で直接styleを操作
        // https://github.com/legalforce/lf-webapp-frontend/pull/642
        baseRef.current.style.left = `${targetRect.left - anchorRect.left + offsetX - offsetLeft}px`;
        baseRef.current.style.top = `${targetRect.top - anchorRect.top + offsetY - offsetTop}px`;
      }
    });
  };

  const hide = () => baseRef.current?.classList.remove(styleActive);

  const handleMouseLeave = useCallback(() => {
    hide();
    window.clearTimeout(timerIdRef.current);
    timerIdRef.current = undefined;
    targetElmRef.current?.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const schedule = useCallback(() => {
    window.clearTimeout(timerIdRef.current);

    const targetElm = targetElmRef.current;
    if (!targetElm) return;
    timerIdRef.current = window.setTimeout(() => show(targetElm.getBoundingClientRect()), 300);
    targetElm.addEventListener('mouseleave', handleMouseLeave);
  }, []);

  useEffect(() => {
    const targetElm = document.querySelector<HTMLElement>(targetSelector);

    if (!targetElm) return;

    targetElmRef.current = targetElm;
    targetElm.addEventListener('mouseenter', schedule);
    /** target非活性状態変更時にmouseleaveイベントを実行し、当要素を確実に非表示とする */
    const observer: MutationObserver = new MutationObserver(records =>
      records.forEach(record => (record.target as HTMLButtonElement).disabled && handleMouseLeave()),
    );

    observer.observe(targetElm, {
      attributes: true,
      attributeFilter: ['disabled'],
    });

    return () => {
      targetElm.removeEventListener('mouseenter', schedule);
      observer.disconnect();
    };
  }, [targetSelector, schedule, handleMouseLeave]);

  return createPortal(
    <div role="tooltip" className={styleBase} ref={baseRef}>
      {children}
    </div>,
    document.body,
  );
};

function getStyle(elm: HTMLElement, styleProp: string): string {
  const { defaultView } = elm.ownerDocument || document;
  return defaultView?.getComputedStyle ? defaultView.getComputedStyle(elm, '').getPropertyValue(styleProp) : '';
}

function getAnchorElement(tooltipElm: HTMLDivElement): HTMLElement {
  let parent = tooltipElm.parentNode as HTMLElement;
  while (parent && parent !== document.body) {
    const pos = getStyle(parent, 'position');
    if (pos === 'absolute' || pos === 'relative' || pos === 'fixed') {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
}

const styleBase = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${ZIndex.Tooltip};
  max-width: 200px;
  padding: ${gutter(2)};
  font-size: ${FontSize.Tiny};
  line-height: ${LineHeight.Compressed};
  color: white;
  word-break: break-all;
  pointer-events: none;
  user-select: none;
  background-color: ${Color.ThemePrimaryDarker};
  border-radius: ${BorderRadius.Small};
  opacity: 0;
  transition: opacity ${Duration.Fade};
`;

const styleActive = css`
  opacity: 1;
`;
