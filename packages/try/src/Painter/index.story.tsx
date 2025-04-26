import { css, cx } from '@emotion/css';
import constate from 'constate';
import type Konva from 'konva';
import { type KonvaEventObject } from 'konva/lib/Node';
import { Suspense, use, useCallback, useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
import { Image, Layer, Line, Stage, type StageProps } from 'react-konva';
import { loadImage } from '../ReactKonva/utils/image';
import { serializePoints, type Point } from '../ReactKonva/utils/point';
import { useStateHistory } from './useStateHistory';

export const Story: FC = () => {
  const imagePromise = loadImage('https://picsum.photos/480/360');

  return (
    <StageProvider>
      <Presentation imagePromise={imagePromise} />
    </StageProvider>
  );
};

type PresentationProps = {
  imagePromise: Promise<HTMLImageElement>;
};

const Presentation: FC<PresentationProps> = ({ imagePromise }) => {
  const [currentTool, setCurrentTool] = useState<Tool>('pen');

  const [strokeWidth, setStrokeWidth] = useState(5);

  const [color, setColor] = useState('#df4b26');

  const { history, historyIndex, pushState, undo, redo, reset } = useStateHistory<Line[]>([]);

  const handleChangeTool = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentTool(target.value as Tool);
  };

  const handleChangeThickness = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(Number(target.value));
  };

  const handleChangeColor = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };

  const handleClickUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const handleReset = () => {
    reset();
  };

  const StageComponent = useStageComponent();

  return (
    <>
      <div>
        <ul>
          {Tool.map((tool) => (
            <li key={tool}>
              <label>
                <input
                  type="radio"
                  name="tool"
                  value={tool}
                  checked={currentTool === tool}
                  onChange={handleChangeTool}
                />
                <span>{tool.toUpperCase()}</span>
              </label>
            </li>
          ))}
        </ul>

        <input type="number" min={5} step={5} max={20} value={strokeWidth} onChange={handleChangeThickness} />

        <input type="color" value={color} onChange={handleChangeColor} />

        <button disabled={historyIndex <= 0} onClick={handleClickUndo}>
          Undo
        </button>
        <button disabled={historyIndex + 1 >= history.length} onClick={handleRedo}>
          Redo
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <StageComponent
          className={cx(styleStage, currentTool === 'pen' ? styleStageDrawing : styleErasing)}
          width={480}
          height={360}
        >
          <Layer>
            <ImageViewer imagePromise={imagePromise} />
          </Layer>

          <Layer>
            <DrawingBoard color={color} strokeWidth={strokeWidth} currentTool={currentTool} onLinesChange={pushState} />
          </Layer>
        </StageComponent>
      </Suspense>
    </>
  );
};

const styleStage = css`
  width: fit-content;
`;
const styleStageDrawing = css`
  cursor:
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMWYxZjFmIj48cGF0aCBkPSJtNDkwLTUyNyAzNyAzNyAyMTctMjE3LTM3LTM3LTIxNyAyMTdaTTIwMC0yMDBoMzdsMjMzLTIzMy0zNy0zNy0yMzMgMjMzdjM3Wm0zNTUtMjA1TDQwNS01NTVsMTY3LTE2Ny0yOS0yOS0yMTkgMjE5LTU2LTU2IDIxOC0yMTlxMjQtMjQgNTYuNS0yNHQ1Ni41IDI0bDI5IDI5IDUwLTUwcTEyLTEyIDI4LjUtMTJ0MjguNSAxMmw5MyA5M3ExMiAxMiAxMiAyOC41VDgyOC02NzhMNTU1LTQwNVpNMjcwLTEyMEgxMjB2LTE1MGwyODUtMjg1IDE1MCAxNTAtMjg1IDI4NVoiLz48L3N2Zz4=')
      0 16,
    crosshair;
`;

const styleErasing = css`
  cursor:
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMWYxZjFmIj48cGF0aCBkPSJNNjkwLTI0MGgxOTB2ODBINjEwbDgwLTgwWm0tNTAwIDgwLTg1LTg1cS0yMy0yMy0yMy41LTU3dDIyLjUtNThsNDQwLTQ1NnEyMy0yNCA1Ni41LTI0dDU2LjUgMjNsMTk5IDE5OXEyMyAyMyAyMyA1N3QtMjMgNTdMNTIwLTE2MEgxOTBabTI5Ni04MCAzMTQtMzIyLTE5OC0xOTgtNDQyIDQ1NiA2NCA2NGgyNjJabS02LTI0MFoiLz48L3N2Zz4=')
      0 16,
    auto;
`;

const Tool = ['pen', 'eraser'] as const;

type Tool = (typeof Tool)[number];

type Line = {
  tool: Tool;
  strokeWidth: number;
  color: string;
  points: Point[];
};

type ImageViewerProps = {
  imagePromise: Promise<HTMLImageElement>;
};

const ImageViewer: FC<ImageViewerProps> = ({ imagePromise }) => {
  const image = use(imagePromise);

  return <Image image={image} x={0} y={0} width={image.width} height={image.height} />;
};

type DrawingBoardProps = {
  color: string;
  strokeWidth: number;
  currentTool: Tool;
  onLinesChange: (lines: Line[]) => void;
};

const DrawingBoard: FC<DrawingBoardProps> = ({ color, strokeWidth, currentTool, onLinesChange }) => {
  const { current: stage } = useStageRef();

  // Ref to track if the user is drawing
  const drawingRef = useRef(false);

  const [lines, setLines] = useState<Line[]>([]);

  const handlePointerDown = useCallback(
    ({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const position = target.getStage()?.getPointerPosition();

      if (!position) return;

      drawingRef.current = true;

      setLines((previous) => [...previous, { tool: currentTool, strokeWidth, color, points: [position] }]);
    },
    [color, currentTool, strokeWidth],
  );

  const handlePointerMove = useCallback(
    ({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!drawingRef.current) return;

      const stage = target.getStage();
      if (!stage) return;

      const position = stage.getPointerPosition();
      if (!position) return;

      const lastLine = lines.at(-1);
      if (!lastLine) return;

      lastLine.points = [...lastLine.points, position];

      lines.splice(-1, 1, lastLine);

      setLines([...lines]);
    },
    [lines],
  );

  const handlePointerUp = useCallback(() => {
    drawingRef.current = false;
    onLinesChange(lines);
  }, [lines, onLinesChange]);

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

function useHook() {
  const stageRef = useRef<Konva.Stage>(null);

  // eslint-disable-next-line react/jsx-props-no-spreading
  const StageComponent = (props: StageProps) => <Stage {...props} ref={stageRef} />;

  return {
    stageRef,
    StageComponent,
  };
}

const [StageProvider, useStageRef, useStageComponent] = constate(
  useHook,
  (hook) => hook.stageRef,
  (hook) => hook.StageComponent,
);
