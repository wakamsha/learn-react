import type Konva from 'konva';
import { type KonvaEventObject } from 'konva/lib/Node';
import { type FC, useEffect, useRef } from 'react';
import { Circle, Layer, Rect, Stage, Text } from 'react-konva';

/**
 * @see {@link https://konvajs.org/docs/react/Access_Konva_Nodes.html Access Konva Nodes}
 */
export const Story: FC = () => {
  const rectRef = useRef<Konva.Rect>(null);

  const handleCircleClick = (event: KonvaEventObject<MouseEvent>) => {
    console.info(event);
  };

  useEffect(() => {
    console.info(rectRef.current);
  }, []);

  return (
    <>
      <h2>Getting Started</h2>

      <Stage width={600} height={720}>
        <Layer>
          <Text text="Try to drag shapes" fontSize={16} />
          <Rect ref={rectRef} draggable x={20} y={50} width={100} height={100} fill="red" shadowBlur={10} />
          <Circle draggable x={200} y={100} radius={50} fill="green" onClick={handleCircleClick} />
        </Layer>
      </Stage>
    </>
  );
};
