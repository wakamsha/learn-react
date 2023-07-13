import { css, cx } from '@emotion/css';
import { Children, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Pane } from './Pane';
import { Splitter } from './Splitter';

type Size = `${number}px` | `${number}%`;

type Props = {
  children: ReactNode;
  /**
   * Pane の並ぶ向き。
   *
   * - horizontal: 水平方向
   * - vertical: 垂直方向
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * サイズの基準となる Pane.
   *
   * このプロパティで指定された Pane に対しサイズ計算が適用され、
   * もう一方は全体サイズのうちの残りの分が割り当てられます。
   *
   * @default 'first'
   */
  primary?: 'first' | 'second';
  /**
   * 最小サイズ ( px | % )
   *
   * `primary` で指定された Pane に対し適用されます。
   *
   * @default '50px'
   */
  minSize?: Size;
  /**
   * 最大サイズ ( px | % )
   *
   * `primary` で指定された Pane に対し適用されます。
   */
  maxSize?: Size;
  /**
   * 初期サイズ ( px | % )
   *
   * `primary` で指定された Pane に対し適用されます。
   */
  defaultSize?: Size;
  onStarted?: () => void;
  /**
   * ドラッグ操作中の `primary` 指定した Pane のサイズ (px) を返します。
   */
  onChange?: (newSize: number) => void;
  /**
   * ドラッグ操作を終えた時点での `primary` 指定した Pane のサイズ (px) を返します。
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
  minSize = '50px',
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

  // ドラッグ操作中かどうかを示すフラグ。
  const [active, setActive] = useState(false);

  const [pane1Size, setPane1Size] = useState(primary === 'first' ? initialSize : undefined);

  const [pane2Size, setPane2Size] = useState(primary === 'second' ? initialSize : undefined);

  // ドラッグ操作後のサイズ。
  // `onFinished` コールバック関数の引数として使う。
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

    const [ref1, ref2] = primary === 'first' ? [pane1.current, pane2.current] : [pane2.current, pane1.current];

    const { width, height } = ref1.getBoundingClientRect();
    const [current, size] = orientation === 'horizontal' ? [e.clientX, width] : [e.clientY, height];
    const positionDelta = position - current;
    let sizeDelta = positionDelta * (primary === 'first' ? 1 : -1);

    const pane1Order = parseInt(window.getComputedStyle(ref1).order, 10);
    const pane2Order = parseInt(window.getComputedStyle(ref2).order, 10);
    if (pane1Order > pane2Order) {
      sizeDelta = -sizeDelta;
    }

    const newMaxSize = maxSize && numberAsPixelOf(maxSize);

    let newSize = size - sizeDelta;
    const newPosition = position - positionDelta;
    const numAsPixelOfMinSize = numberAsPixelOf(minSize);

    if (newSize < numAsPixelOfMinSize) {
      newSize = numAsPixelOfMinSize;
    } else if (typeof newMaxSize === 'number' && newSize > newMaxSize) {
      newSize = newMaxSize;
    } else {
      setPosition(newPosition);
    }

    onChange?.(newSize);

    setDraggedSize(`${newSize}px`);
    primary === 'first' ? setPane1Size(`${newSize}px`) : setPane2Size(`${newSize}px`);
  };

  const handleMouseUp = () => {
    if (!active) return;

    onFinished?.(numberAsPixelOf(draggedSize));
    setActive(false);
  };

  const handleDoubleClick = () => {
    if (draggedSize === initialSize) return;

    primary === 'first' ? setPane1Size(initialSize) : setPane2Size(initialSize);

    onChange?.(numberAsPixelOf(initialSize));

    setDraggedSize(initialSize);
  };

  /**
   * Size 型の値を実際の px 値に変換します。
   *
   * @param size - 変換したい size 値。
   *
   * @returns    変換後の px 値。
   */
  const numberAsPixelOf = (size: Size): number => {
    if (/\d+px/.test(size)) {
      return Number(size.replace('px', ''));
    }

    if (!container.current) return 0;
    const ratio = Number(size.replace('%', '')) / 100;
    switch (orientation) {
      case 'horizontal':
        return container.current.clientWidth * ratio;
      case 'vertical':
        return container.current.clientHeight * ratio;
    }
  };

  const nonNullChildren = Children.toArray(children).filter((c) => !!c);

  return (
    <div className={styleBase}>
      <div aria-orientation={orientation} className={styleContainer} ref={container}>
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

        {nonNullChildren[1] ? (
          <Pane ref={pane2} orientation={orientation} size={pane2Size}>
            {nonNullChildren[1]}
          </Pane>
        ) : null}
      </div>
    </div>
  );
};

const styleBase = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const styleContainer = css`
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
