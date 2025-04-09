import { css, cx } from '@emotion/css';
import { type KonvaEventObject } from 'konva/lib/Node';
import { Suspense, use, useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
import { Image, Layer, Line, Stage } from 'react-konva';
import { loadImage } from '../ReactKonva/utils/image';
import { serializePoints, type Point } from '../ReactKonva/utils/point';
import { useStateHistory } from './useStateHistory';

export const Story: FC = () => {
  const imagePromise = loadImage('https://picsum.photos/480/360');

  return <Presentation imagePromise={imagePromise} />;
};

type PresentationProps = {
  imagePromise: Promise<HTMLImageElement>;
};

const Presentation: FC<PresentationProps> = ({ imagePromise }) => {
  const [currentTool, setCurrentTool] = useState<Tool>('pen');

  const [lines, setLines] = useState<Line[]>([]);

  const [strokeWidth, setStrokeWidth] = useState(5);

  const [color, setColor] = useState('#df4b26');

  // Ref to track if the user is drawing
  const drawingRef = useRef(false);

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

  const handlePointerDown = ({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const position = target.getStage()?.getPointerPosition();

    if (!position) return;

    drawingRef.current = true;

    setLines((previous) => [...previous, { tool: currentTool, strokeWidth, color, points: [position] }]);
  };

  const handlePointerMove = ({ target }: KonvaEventObject<MouseEvent | TouchEvent>) => {
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
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    pushState(lines);
  };

  const handleClickUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const handleReset = () => {
    reset();
    // setLines([]);
  };

  useEffect(() => {
    if (historyIndex >= 0 && historyIndex < history.length) {
      setLines(history[historyIndex]);
    }
  }, [historyIndex, history]);

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
        <Stage
          className={cx(styleStage, currentTool === 'pen' ? styleStageDrawing : styleErasing)}
          width={480}
          height={360}
          onMouseDown={handlePointerDown}
          onMousemove={handlePointerMove}
          onMouseup={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <Layer>
            <ImageViewer imagePromise={imagePromise} />
          </Layer>

          <Layer>
            <DrawingBoard lines={lines} />
          </Layer>
        </Stage>
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
  lines: Line[];
};

const DrawingBoard: FC<DrawingBoardProps> = ({ lines }) => (
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
