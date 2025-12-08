/* eslint-disable react-hooks/refs */
import { type KonvaEventObject } from 'konva/lib/Node';
import { type FC, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

type Position = {
  x: number;
  y: number;
};

/**
 * @see {@link https://konvajs.org/docs/react/Undo-Redo.html Undo/Redo}
 */
export const Story: FC = () => {
  const initialPosition: Position = {
    x: 20,
    y: 20,
  };

  const [position, setPosition] = useState<Position>(initialPosition);

  const history = useRef<Position[]>([initialPosition]);

  const historyStep = useRef(0);

  const handleDragEnd = (event: KonvaEventObject<DragEvent>) => {
    // Remove all states after current step
    history.current = history.current.slice(0, historyStep.current + 1);

    const position: Position = {
      x: event.target.x(),
      y: event.target.y(),
    };

    // Push the new state
    history.current = [...history.current, position];
    historyStep.current += 1;
    setPosition(position);
  };

  const handleUndo = () => {
    if (historyStep.current === 0) return;

    historyStep.current -= 1;

    setPosition(history.current[historyStep.current]);
  };

  const handleRedo = () => {
    if (historyStep.current >= history.current.length - 1) return;

    historyStep.current += 1;

    setPosition(history.current[historyStep.current]);
  };

  return (
    <>
      <h2>How to implement undo/redo on canvas with React?</h2>
      <button disabled={historyStep.current === 0} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={historyStep.current === history.current.length - 1} onClick={handleRedo}>
        Redo
      </button>

      <Stage width={600} height={720}>
        <Layer>
          <Rect draggable x={position.x} y={position.y} width={50} height={50} fill="red" onDragEnd={handleDragEnd} />
        </Layer>
      </Stage>
    </>
  );
};
