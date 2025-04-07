import { type KonvaEventObject } from 'konva/lib/Node';
import { useRef, useState, type ChangeEvent, type FC } from 'react';
import { Layer, Line, Stage, Text } from 'react-konva';
import { serializePoints, type Point } from './utils/point';

/**
 * @see {@link https://konvajs.org/docs/react/Free_Drawing.html Free Drawing}
 */
export const Story: FC = () => {
  const [tool, setTool] = useState<Tool>('pen');

  const [lines, setLines] = useState<Line[]>([]);

  const drawingRef = useRef(false);

  const handleChangeTool = (event: ChangeEvent<HTMLSelectElement>) => {
    setTool(event.target.value as Tool);
  };

  const handleMouseDown = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const position = event.target.getStage()?.getPointerPosition();

    if (!position) return;

    drawingRef.current = true;

    setLines((previous) => [...previous, { tool, points: [position] }]);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!drawingRef.current) return;

    const stage = event.target.getStage();
    if (!stage) return;

    const position = stage.getPointerPosition();
    if (!position) return;

    const lastLine = lines.at(-1);
    if (!lastLine) return;

    lastLine.points = [...lastLine.points, position];

    lines.splice(-1, 1, lastLine);

    setLines([...lines]);
  };

  const handleMouseUp = () => {
    drawingRef.current = false;
  };

  return (
    <>
      <h2>How to implement free drawing on canvas with React?</h2>

      <select value={tool} onChange={handleChangeTool}>
        {Tool.map((tool) => (
          <option key={tool} value={tool}>
            {tool}
          </option>
        ))}
      </select>

      <Stage
        width={600}
        height={720}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" fontSize={16} />

          {lines.map((line, i) => (
            <Line
              key={i}
              points={serializePoints(line.points)}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

const Tool = ['pen', 'eraser'] as const;

type Tool = (typeof Tool)[number];

type Line = {
  tool: Tool;
  points: Point[];
};
