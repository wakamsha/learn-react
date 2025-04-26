import { type KonvaEventObject } from 'konva/lib/Node';
import { type FC, useCallback, useEffect, useRef } from 'react';
import { Line } from 'react-konva';
import { serializePoints } from '../../ReactKonva/utils/point';
import { type Tool } from '../constants';
import { useLines, usePushState, useUpdateLines } from '../contexts/LineHistory';
import { useStageRef } from '../contexts/Stage';

type Props = {
  /**
   * The color of the line.
   */
  color: string;
  /**
   * The stroke width of the line.
   */
  strokeWidth: number;
  /**
   * The current drawing tool.
   */
  currentTool: Tool;
};

/**
 * DrawingBoard component to handle drawing on the canvas. *
 */
export const DrawingBoard: FC<Props> = ({ color, strokeWidth, currentTool }) => {
  // Ref to track if the user is drawing
  const drawingRef = useRef(false);

  const { current: stage } = useStageRef();

  const lines = useLines();
  const updateLines = useUpdateLines();
  const pushState = usePushState();

  const handlePointerDown = useCallback(
    ({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const position = target.getStage()?.getPointerPosition();

      if (!position) return;

      drawingRef.current = true;

      updateLines([...lines, { tool: currentTool, strokeWidth, color, points: [position] }]);
    },
    [color, currentTool, lines, strokeWidth, updateLines],
  );

  const handlePointerMove = useCallback(
    ({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!drawingRef.current) return;

      const position = target.getStage()?.getPointerPosition();
      if (!position) return;

      const lastLine = lines.at(-1);
      if (!lastLine) return;

      lastLine.points = [...lastLine.points, position];

      lines.splice(-1, 1, lastLine);

      updateLines([...lines]);
    },
    [lines, updateLines],
  );

  const handlePointerUp = useCallback(() => {
    drawingRef.current = false;
    pushState(lines);
  }, [lines, pushState]);

  useEffect(() => {
    if (!stage) return;

    stage.on('mousedown touchstart', handlePointerDown);
    stage.on('mousemove touchmove', handlePointerMove);
    stage.on('mouseup touchend', handlePointerUp);

    return () => {
      stage.off('mousedown touchstart', handlePointerDown);
      stage.off('mousemove touchmove', handlePointerMove);
      stage.off('mouseup touchend', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp, stage]);

  return (
    <>
      {lines.map((line, index) => (
        <Line
          key={index}
          points={serializePoints(line.points)}
          stroke={line.color}
          strokeWidth={line.strokeWidth}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
        />
      ))}
    </>
  );
};
