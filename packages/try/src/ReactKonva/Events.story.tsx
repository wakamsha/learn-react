import type Konva from 'konva';
import { type FC, useState } from 'react';
import { Layer, Stage, Star, Text } from 'react-konva';

/**
 * @see {@link https://konvajs.org/docs/react/Events.html Events}
 */
export const Story: FC = () => {
  const [stars, setStars] = useState(() => generateShapes());

  const handleDragStart = (event: Konva.KonvaEventObject<DragEvent>) => {
    setStars((previous) =>
      previous.map((star) => ({
        ...star,
        dragging: star.id === event.target.id(),
      })),
    );
  };

  const handleDragEnd = () => {
    setStars((previous) =>
      previous.map((star) => ({
        ...star,
        dragging: false,
      })),
    );
  };

  return (
    <>
      <h2>How to listen to an event on a canvas shape with React and Konva?</h2>

      <Stage width={600} height={720}>
        <Layer>
          <Text text="Try to drag a star" fontSize={16} />

          {stars.map((star) => (
            <Star
              key={star.id}
              draggable
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={star.dragging ? 10 : 5}
              shadowOffsetY={star.dragging ? 10 : 5}
              scaleX={star.dragging ? 1.2 : 1}
              scaleY={star.dragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

type ShapeProp = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  dragging: boolean;
};

function generateShapes(): ShapeProp[] {
  return [...Array(10).keys()].map((i) => ({
    id: i.toString(),
    x: Math.random() * 600,
    y: Math.random() * 720,
    rotation: Math.random() * 180,
    dragging: false,
  }));
}
