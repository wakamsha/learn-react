import type Konva from 'konva';
import { type FC, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

/**
 * @see {@link https://konvajs.org/docs/react/Simple_Animations.html Simple Animations}
 */
export const Story: FC = () => {
  const rectRef = useRef<Konva.Rect>(null);

  const handleDrag = () => {
    if (!rectRef.current) return;

    rectRef.current.to({
      scaleX: Math.random() + 0.8,
      scaleY: Math.random() + 0.8,
      duration: 0.2,
    });
  };

  return (
    <>
      <h2>How to apply canvas animations with React and Konva?</h2>

      <Stage width={600} height={720}>
        <Layer>
          <Rect
            ref={rectRef}
            draggable
            width={50}
            height={50}
            fill="green"
            onDragStart={handleDrag}
            onDragEnd={handleDrag}
          />
        </Layer>
      </Stage>
    </>
  );
};
