import { css } from '@emotion/css';
import { type FC } from 'react';
import { useStateHistory } from '.';
import { gutter } from '../../helpers/Style';

export const Story: FC = () => {
  const { history, historyIndex, currentState, pushState, undo, redo, reset } = useStateHistory(0);

  const handleIncrement = () => {
    pushState(currentState + 1);
  };

  const handleDecrement = () => {
    pushState(currentState - 1);
  };

  const handleUndo = () => {
    undo();
  };

  const handleRedo = () => {
    redo();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <h2>useStateHistory Demo</h2>

      <div className={styleControls}>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button disabled={historyIndex <= 0} onClick={handleUndo}>
          Undo
        </button>
        <button disabled={historyIndex + 1 >= history.length} onClick={handleRedo}>
          Redo
        </button>
        <button disabled={history.length === 1} onClick={handleReset}>
          Reset
        </button>
      </div>

      <pre>
        <code>{JSON.stringify({ history, historyIndex, currentState }, null, 2)}</code>
      </pre>
    </>
  );
};

const styleControls = css`
  display: flex;
  gap: ${gutter(2)};
`;
