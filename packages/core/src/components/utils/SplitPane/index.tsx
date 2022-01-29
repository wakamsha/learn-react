import { css, cx } from '@emotion/css';
import type { MouseEvent, ReactNode } from 'react';
import { Children, useRef, useState } from 'react';
import { Pane } from './Pane';
import { Splitter } from './Splitter';

type Props = {
  children: ReactNode;
  /**
   * Pane の並ぶ向き。
   *
   * - horizontal: 水平方向
   * - vertical: 垂直方向
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * サイズの基準となる Pane.
   *
   * このプロパティで指定された Pane に対しサイズ計算が適用され、
   * もう一方は全体サイズのうちの残りの分が割り当てられます。
   */
  primary?: 'first' | 'second';
  /**
   * 最小サイズ ( px )
   *
   * `primary` で指定された Pane に対し適用されます。
   */
  minSize?: number;
  /**
   * 最大サイズ ( px )
   *
   * `primary` で指定された Pane に対し適用されます。
   */
  maxSize?: number;
  /**
   * 初期サイズ ( px )
   *
   * `primary` で指定された Pane に対し適用されます。
   */
  defaultSize?: number;
  onStarted?: () => void;
  /**
   * ドラッグ操作中の `primary` 指定した Pane のサイズを返します。
   */
  onChange?: (newSize: number) => void;
  /**
   * ドラッグ操作を終えた時点での `primary` 指定した Pane のサイズを返します。
   */
  onFinished?: (draggedSize: number) => void;
};

/**
 * 2つの Pane のサイズをドラッグ操作で自在に変更できるレイアウトコンポーネントです。
 *
 * Splitter をダブルクリックすると Pane のサイズがリセットされます。
 */
export const SplitPane = ({
  children,
  orientation = 'horizontal',
  primary = 'first',
  minSize = 50,
  maxSize,
  defaultSize,
  onStarted,
  onChange,
  onFinished,
}: Props) => {
  const initialSize = defaultSize ?? minSize;

  const container = useRef<HTMLDivElement>(null);

  const pane1 = useRef<HTMLDivElement>(null);

  const pane2 = useRef<HTMLDivElement>(null);

  // ドラッグ操作中かどうかを示すフラグ
  const [active, setActive] = useState(false);

  const [pane1Size, setPane1Size] = useState(primary === 'first' ? initialSize : undefined);

  const [pane2Size, setPane2Size] = useState(primary === 'second' ? initialSize : undefined);

  const [draggedSize, setDraggedSize] = useState(initialSize);

  const [position, setPosition] = useState(0);

  /**
   * UI 上の文字列選択を強制キャンセルします。
   *
   * ドラッグはカーソルを動かす操作であり文字列選択操作と被るため、
   * ドラッグ中に不要に文字列が選択されないために当メソッドを実行させます。
   */
  const unFocus = () => {
    const selection = window.getSelection();

    if (selection?.empty) {
      selection.empty();
    } else if (selection?.removeAllRanges) {
      selection.removeAllRanges();
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLSpanElement>) => {
    unFocus();

    setActive(true);
    setPosition(orientation === 'horizontal' ? e.clientX : e.clientY);

    onStarted?.();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!active || !container.current || !pane1.current || !pane2.current) return;

    unFocus();

    const [ref, ref2] = primary === 'first' ? [pane1.current, pane2.current] : [pane2.current, pane1.current];

    const { width, height } = ref.getBoundingClientRect();
    const [current, size] = orientation === 'horizontal' ? [e.clientX, width] : [e.clientY, height];
    const positionDelta = position - current;
    let sizeDelta = positionDelta * (primary === 'first' ? 1 : -1);

    const pane1Order = parseInt(window.getComputedStyle(ref).order, 10);
    const pane2Order = parseInt(window.getComputedStyle(ref2).order, 10);
    if (pane1Order > pane2Order) {
      sizeDelta = -sizeDelta;
    }

    let newMaxSize = maxSize;
    if (typeof maxSize === 'number' && maxSize <= 0) {
      const { width, height } = container.current.getBoundingClientRect();
      newMaxSize = maxSize + (orientation === 'horizontal' ? width : height);
    }

    let newSize = size - sizeDelta;
    const newPosition = position - positionDelta;

    if (newSize < minSize) {
      newSize = minSize;
    } else if (typeof newMaxSize === 'number' && newSize > newMaxSize) {
      newSize = newMaxSize;
    } else {
      setPosition(newPosition);
    }

    onChange?.(newSize);

    setDraggedSize(newSize);
    primary === 'first' ? setPane1Size(newSize) : setPane2Size(newSize);
  };

  const handleMouseUp = () => {
    if (!active) return;

    onFinished?.(draggedSize);
    setActive(false);
  };

  const handleDoubleClick = () => {
    if (draggedSize === initialSize) return;

    primary === 'first' ? setPane1Size(initialSize) : setPane2Size(initialSize);

    onChange?.(initialSize);

    setDraggedSize(initialSize);
  };

  const nonNullChildren = Children.toArray(children).filter(c => !!c);

  return (
    <div className={styleBase}>
      <div aria-orientation={orientation} className={styleGrid} ref={container}>
        {active ? (
          <div
            role="presentation"
            className={styleOverlay[orientation]}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        ) : null}

        <Pane ref={pane1} orientation={orientation} size={pane1Size}>
          {nonNullChildren[0]}
        </Pane>
        <Splitter
          orientation={orientation}
          grabbed={active}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        />
        <Pane ref={pane2} orientation={orientation} size={pane2Size}>
          {nonNullChildren[1]}
        </Pane>
      </div>
    </div>
  );
};

const styleBase = css`
  position: relative;
  width: 100%;
`;

const styleGrid = css`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: none;

  &[aria-orientation='horizontal'] {
    flex-direction: row;
  }

  &[aria-orientation='vertical'] {
    flex-direction: column;
  }
`;

const styleOverlayBase = css`
  position: fixed;
  inset: 0;
  z-index: 1;
`;

const styleOverlay: Frozen<NonNullable<Props['orientation']>, string> = {
  horizontal: cx(
    styleOverlayBase,
    css`
      cursor: col-resize;
    `,
  ),
  vertical: cx(
    styleOverlayBase,
    css`
      cursor: row-resize;
    `,
  ),
};
