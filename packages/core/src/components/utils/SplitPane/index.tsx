import { css } from '@emotion/css';
import type { MouseEvent, ReactNode } from 'react';
import { Children, useRef, useState } from 'react';
import { Pane } from './Pane';
import { Splitter } from './Splitter';

type Props = {
  children: ReactNode;
  primary?: 'first' | 'second';
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  onStarted?: () => void;
  onChange?: (newSize: number) => void;
  onFinished?: (draggedSize: number) => void;
};

export const SplitPane = ({
  children,
  primary = 'first',
  minSize = 50,
  maxSize,
  defaultSize,
  onStarted,
  onChange,
  onFinished,
}: Props) => {
  const initialSize = getInitialSize({ minSize, defaultSize });

  const container = useRef<HTMLDivElement>(null);

  const pane1 = useRef<HTMLDivElement>(null);

  const pane2 = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const [pane1Size, setPane1Size] = useState(primary === 'first' ? initialSize : undefined);

  const [pane2Size, setPane2Size] = useState(primary === 'second' ? initialSize : undefined);

  const [draggedSize, setDraggedSize] = useState(initialSize);

  const [position, setPosition] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    unFocus();
    const position = e.clientX;

    onStarted?.();

    setActive(true);
    setPosition(position);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!active || !container.current || !pane1.current || !pane2.current) return;

    unFocus();

    const [ref, ref2] = primary === 'first' ? [pane1.current, pane2.current] : [pane2.current, pane1.current];

    const { width } = ref.getBoundingClientRect();
    const current = e.clientX;
    const size = width;
    const positionDelta = position - current;
    let sizeDelta = positionDelta * (primary === 'first' ? 1 : -1);

    const pane1Order = parseInt(window.getComputedStyle(ref).order, 10);
    const pane2Order = parseInt(window.getComputedStyle(ref2).order, 10);
    if (pane1Order > pane2Order) {
      sizeDelta = -sizeDelta;
    }

    let newMaxSize = maxSize;
    if (typeof maxSize === 'number' && maxSize <= 0) {
      newMaxSize = container.current.getBoundingClientRect().width + maxSize;
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

  const onMouseUp = () => {
    if (!active) return;
    onFinished?.(draggedSize);
    setActive(false);
  };

  const nonNullChildren = Children.toArray(children).filter(c => c);

  return (
    <div role="grid" className={styleBase} ref={container}>
      {active ? (
        <div role="presentation" className={styleOverlay} onMouseMove={onMouseMove} onMouseUp={onMouseUp} />
      ) : null}
      <Pane ref={pane1} size={pane1Size}>
        {nonNullChildren[0]}
      </Pane>
      <Splitter grabbed={active} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
      <Pane ref={pane2} size={pane2Size}>
        {nonNullChildren[1]}
      </Pane>
    </div>
  );
};

function unFocus() {
  const selection = window.getSelection();
  if (selection?.empty) {
    selection.empty();
  } else if (selection?.removeAllRanges) {
    selection.removeAllRanges();
  }
}

function getInitialSize({ minSize, defaultSize }: { minSize: number; defaultSize?: number }) {
  return defaultSize ?? minSize;
}

const styleBase = css`
  position: absolute;
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: none;
`;

const styleOverlay = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;
