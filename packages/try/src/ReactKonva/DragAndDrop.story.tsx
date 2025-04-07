import { type KonvaEventObject } from 'konva/lib/Node';
import { type FC, useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';

type Position = {
  x: number;
  y: number;
};

/**
 * @see {@link https://konvajs.org/docs/react/Drag_And_Drop.html Drag and Drop}
 */
export const Story: FC = () => {
  const [dragging, setDragging] = useState(false);

  const [position, setPosition] = useState<Position>({
    x: 50,
    y: 50,
  });

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = (event: KonvaEventObject<MouseEvent>) => {
    setDragging(false);

    setPosition({
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  return (
    <>
      <h2>Drag and drop canvas shapes</h2>

      <Stage width={600} height={720}>
        <Layer>
          <Text
            draggable
            text="Draggable Text"
            x={position.x}
            y={position.y}
            fontSize={dragging ? 20 : 16}
            fill={dragging ? 'red' : 'black'}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>
    </>
  );
};
