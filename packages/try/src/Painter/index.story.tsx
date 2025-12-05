import { css, cx } from '@emotion/css';
import { Suspense, useReducer, type ChangeEvent, type FC } from 'react';
import { Layer } from 'react-konva';
import { loadImage } from '../ReactKonva/utils/image';
import { DrawingBoard } from './components/DrawingBoard';
import { ImageViewer } from './components/ImageViewer';
import { Tool } from './constants';
import { LineHistoryProvider, useRedo, useReset, useUndo } from './contexts/LineHistory';
import { StageProvider, useStageComponent } from './contexts/Stage';

export const Story: FC = () => {
  const imagePromise = loadImage('https://picsum.photos/480/360');

  return (
    <StageProvider>
      <LineHistoryProvider>
        <Presentation imagePromise={imagePromise} />
      </LineHistoryProvider>
    </StageProvider>
  );
};

type PresentationProps = {
  imagePromise: Promise<HTMLImageElement>;
};

const Presentation: FC<PresentationProps> = ({ imagePromise }) => {
  const [{ currentTool, strokeWidth, color }, dispatch] = useReducer(reducer, {
    currentTool: 'pen',
    strokeWidth: 5,
    color: '#df4b26',
  });

  const undo = useUndo();

  const redo = useRedo();

  const reset = useReset();

  const handleChangeTool = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'tool', payload: target.value as Tool });
  };

  const handleChangeThickness = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'strokeWidth', payload: Number(target.value) });
  };

  const handleChangeColor = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'color', payload: target.value });
  };

  const handleClickUndo = () => {
    undo.run();
  };

  const handleRedo = () => {
    redo.run();
  };

  const handleReset = () => {
    reset.run();
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
        <button disabled={!undo.enable} onClick={handleClickUndo}>
          Undo
        </button>
        <button disabled={!redo.enable} onClick={handleRedo}>
          Redo
        </button>
        <button disabled={!reset.enable} onClick={handleReset}>
          Reset
        </button>
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
            <DrawingBoard color={color} strokeWidth={strokeWidth} currentTool={currentTool} />
          </Layer>
        </StageComponent>
      </Suspense>
    </>
  );
};

type Action =
  | {
      type: 'tool';
      payload: Tool;
    }
  | {
      type: 'strokeWidth';
      payload: number;
    }
  | {
      type: 'color';
      payload: string;
    };

type State = {
  currentTool: Tool;
  strokeWidth: number;
  color: string;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'tool':
      return { ...state, currentTool: action.payload };
    case 'strokeWidth':
      return { ...state, strokeWidth: action.payload };
    case 'color':
      return { ...state, color: action.payload };
    // oxlint-disable-next-line switch-exhaustiveness-check
    default:
      return state;
  }
}

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
