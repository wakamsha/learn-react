import { useStateHistory } from '@learn-react/core/src/hooks/useStateHistory';
import constate from 'constate';
import { useEffect, useState } from 'react';
import { type Point } from '../../ReactKonva/utils/point';
import { type Tool } from '../constants';

type Line = {
  /**
   * The tool used to draw the line.
   */
  tool: Tool;
  /**
   * The stroke width of the line.
   */
  strokeWidth: number;
  /**
   * The color of the line.
   */
  color: string;
  /**
   * The points that make up the line.
   */
  points: Point[];
};

function useHook() {
  const [lines, setLines] = useState<Line[]>([]);

  const { history, historyIndex, pushState, undo, redo, reset } = useStateHistory<Line[]>([]);

  useEffect(() => {
    if (historyIndex >= 0 && historyIndex < history.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLines(history[historyIndex]);
    }
  }, [historyIndex, history]);

  return {
    lines,
    history,
    historyIndex,
    pushState,
    undo,
    redo,
    reset,
    setLines,
  };
}

const [LineHistoryProvider, useLines, usePushState, useUndo, useRedo, useReset, useUpdateLines] = constate(
  useHook,
  (hook) => hook.lines,
  (hook) => hook.pushState,
  (hook) => ({
    enable: hook.historyIndex > 0,
    run: hook.undo,
  }),
  (hook) => ({
    enable: hook.historyIndex + 1 < hook.history.length,
    run: hook.redo,
  }),
  (hook) => ({
    enable: hook.history.length > 1,
    run: hook.reset,
  }),
  (hook) => hook.setLines,
);

export { LineHistoryProvider, useLines, usePushState, useRedo, useReset, useUndo, useUpdateLines };
