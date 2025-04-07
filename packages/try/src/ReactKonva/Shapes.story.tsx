import { type FC } from 'react';
import { Circle, Layer, Line, Rect, Stage, Text } from 'react-konva';

/**
 * @see {@link https://konvajs.org/docs/react/Shapes.html Shapes}
 */
export const Story: FC = () => (
  <>
    <h2>Drawing canvas shapes with React</h2>

    <Stage width={600} height={720}>
      <Layer>
        <Text text="Some text on canvas" fontSize={16} />

        <Rect x={20} y={50} width={100} height={100} fill="red" shadowBlur={10} />

        <Circle x={200} y={100} radius={50} fill="green" />

        <Line
          closed
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        />
      </Layer>
    </Stage>
  </>
);
