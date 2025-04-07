import type Konva from 'konva';
import { type FC } from 'react';
import { Layer, Shape, Stage } from 'react-konva';

/**
 * @see {@link https://konvajs.org/docs/react/Custom_Shape.html Custom Shape}
 */
export const Story: FC = () => {
  const shapeFunction = (context: Konva.Context, shape: Konva.Shape) => {
    const width = shape.width();
    const height = shape.height();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(width - 40, height - 90);
    context.quadraticCurveTo(width - 110, height - 70, width, height);
    context.closePath();

    context.fillStrokeShape(shape);
  };

  return (
    <>
      <h2>How to draw custom shapes with React?</h2>

      <Stage width={600} height={720}>
        <Layer>
          <Shape width={260} height={170} fill="#00D2FF" stroke="black" strokeWidth={4} sceneFunc={shapeFunction} />
        </Layer>
      </Stage>
    </>
  );
};
