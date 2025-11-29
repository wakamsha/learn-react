import type Konva from 'konva';
import { type KonvaEventObject } from 'konva/lib/Node';
import { type Box } from 'konva/lib/shapes/Transformer';
import { type ComponentProps, type FC, useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';

type ShapeProps = Pick<ComponentProps<typeof Rect>, 'x' | 'y' | 'width' | 'height' | 'fill' | 'id'>;

/**
 * @see {@link https://konvajs.org/docs/react/Transformer.html Transformer}
 */
export const Story: FC = () => {
  const [rectangles, setRectangles] = useState<ShapeProps[]>([
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      id: 'rect1',
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      id: 'rect2',
    },
  ]);

  const [selectedId, setSelectedId] = useState<ShapeProps['id'] | null>(null);

  const checkDeselect = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = event.target === event.target.getStage();

    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleChange = (newAttributes: ShapeProps, index: number) => {
    const rects = [...rectangles];
    rects[index] = newAttributes;
    setRectangles(rects);
  };

  return (
    <>
      <h2>How to resize and rotate canvas shapes with React and Konva?</h2>

      <Stage width={600} height={720} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
        <Layer>
          {rectangles.map((rectangle, index) => (
            <Rectangle
              key={rectangle.id}
              shape={rectangle}
              selected={rectangle.id === selectedId}
              onSelect={() => {
                setSelectedId(rectangle.id);
              }}
              onChange={(newAttributes) => {
                handleChange(newAttributes, index);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

type RectangleProps = {
  shape: ShapeProps;
  selected: boolean;
  onSelect: (event: KonvaEventObject<TouchEvent | MouseEvent>) => void;
  onChange: (newAttributes: ShapeProps) => void;
};

const Rectangle: FC<RectangleProps> = ({ shape, selected, onSelect, onChange }) => {
  const shapeRef = useRef<Konva.Rect>(null);

  const transformerRef = useRef<Konva.Transformer>(null);

  const handleSelect = (event: KonvaEventObject<TouchEvent | MouseEvent>) => {
    onSelect(event);
  };

  const handleDragEnd = (event: KonvaEventObject<MouseEvent>) => {
    onChange({
      ...shape,
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  const handleTransformEnd = () => {
    if (!shapeRef.current) return;

    // transformer is changing scale of the node
    // and NOT its width or height
    // but in the store we have only width and height
    // to match the data better we will reset scale on transform end
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...shape,
      x: node.x(),
      y: node.y(),
      // set minimal value
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    });
  };

  const boundBox = (oldBox: Box, newBox: Box) => {
    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
      return oldBox;
    }

    return newBox;
  };

  useEffect(() => {
    if (!selected || !transformerRef.current || !shapeRef.current) return;
    transformerRef.current.nodes([shapeRef.current]);
  }, [selected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        draggable
        id={shape.id}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        fill={shape.fill}
        onClick={handleSelect}
        onTap={handleSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      />

      {selected ? <Transformer ref={transformerRef} boundBoxFunc={boundBox} /> : null}
    </>
  );
};
