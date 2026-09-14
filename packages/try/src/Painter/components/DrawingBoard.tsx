import { type KonvaEventObject } from 'konva/lib/Node';
import { type FC, useEffect, useEffectEvent, useRef } from 'react';
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

  const onPointerDown = useEffectEvent(({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const position = target.getStage()?.getPointerPosition();

    if (!position) return;

    drawingRef.current = true;

    updateLines([...lines, { tool: currentTool, strokeWidth, color, points: [position] }]);
  });

  const onPointerMove = useEffectEvent(({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!drawingRef.current) return;

    const position = target.getStage()?.getPointerPosition();
    if (!position) return;

    updateLines((previous) => {
      const lastLine = previous.at(-1);
      if (!lastLine) return previous;

      return [...previous.slice(0, -1), { ...lastLine, points: [...lastLine.points, position] }];
    });
  });

  const onPointerUp = useEffectEvent(() => {
    drawingRef.current = false;
    pushState(lines);
  });

  useEffect(() => {
    if (!stage) return;

    stage.on('mousedown touchstart', onPointerDown);
    stage.on('mousemove touchmove', onPointerMove);
    stage.on('mouseup touchend', onPointerUp);

    return () => {
      stage.off('mousedown touchstart', onPointerDown);
      stage.off('mousemove touchmove', onPointerMove);
      stage.off('mouseup touchend', onPointerUp);
    };
  }, [stage]);

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
