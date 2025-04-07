import Konva from 'konva';
import { type KonvaEventObject } from 'konva/lib/Node';
import { useState, type ComponentProps, type FC } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

type Item = Pick<ComponentProps<typeof Circle>, 'x' | 'y' | 'id' | 'fill'>;

export const Story: FC = () => {
  const [items, setItems] = useState<Item[]>(() =>
    [...Array(10).keys()].map((index) => ({
      x: Math.random() * 600,
      y: Math.random() * 720,
      id: `circle${index}`,
      fill: Konva.Util.getRandomColor(),
    })),
  );

  const handleDragStart = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const id = event.target.name();

    setItems((previousItems) => {
      const filteredItems = previousItems.filter((item) => item.id !== id);
      const draggedItem = previousItems.find((item) => item.id === id);

      return draggedItem ? [...filteredItems, draggedItem] : filteredItems;
    });
  };

  const handleDragEnd = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const id = event.target.name();
    const x = event.target.x();
    const y = event.target.y();

    setItems((previousItems) => {
      const filteredItems = previousItems.filter((item) => item.id !== id);
      const draggedItem = previousItems.find((item) => item.id === id);

      return draggedItem ? [...filteredItems, { ...draggedItem, x, y }] : filteredItems;
    });
  };

  return (
    <>
      <h2>How to change the zIndex of nodes with React?</h2>

      <Stage width={600} height={720}>
        <Layer>
          {items.map((item) => (
            <Circle
              key={item.id}
              draggable
              name={item.id}
              x={item.x}
              y={item.y}
              fill={item.fill}
              radius={50}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};
