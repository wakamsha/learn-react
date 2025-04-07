import { useState, type FC } from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from 'react-konva';
import { Portal } from 'react-konva-utils';
import { serializePoints } from './utils/point';

/**
 * @see {@link https://konvajs.org/docs/react/Canvas_Portal.html Canvas Portal}
 */
export const Story: FC = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <>
      <h2>How to use portals in react-konva?</h2>

      <Stage width={600} height={720}>
        <Layer>
          <Text text="Try to drag the rectangle. It should be on top while drag." fontSize={16} />

          <Portal selector=".top-layer" enabled={dragging}>
            <Rect
              draggable
              x={20}
              y={50}
              width={150}
              height={150}
              fill="red"
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          </Portal>

          <Circle x={200} y={100} radius={50} fill="green" />

          <Line
            closed
            draggable
            x={30}
            y={200}
            points={serializePoints([
              { x: 0, y: 0 },
              { x: 100, y: 0 },
              { x: 100, y: 100 },
            ])}
            tension={0.5}
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
          />
        </Layer>

        <Layer name="top-layer" />
      </Stage>
    </>
  );
};
