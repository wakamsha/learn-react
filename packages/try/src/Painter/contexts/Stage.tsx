import constate from 'constate';
import type Konva from 'konva';
import { useRef } from 'react';
import { Stage, type StageProps } from 'react-konva';

/**
 * Custom hook to manage the Konva Stage reference and component.
 *
 * @returns An object containing the stage reference and the Stage component.
 */
function useHook() {
  const stageRef = useRef<Konva.Stage>(null);

  // eslint-disable-next-line react/jsx-props-no-spreading
  const StageComponent = (props: StageProps) => <Stage {...props} ref={stageRef} />;

  return {
    /**
     * Reference to the Konva Stage instance.
     */
    stageRef,

    /**
     * The Stage component for rendering the Konva Stage.
     */
    StageComponent,
  };
}

/**
 * Context provider and hooks for managing the Konva Stage.
 */
const [StageProvider, useStageRef, useStageComponent] = constate(
  useHook,
  (hook) => hook.stageRef,
  (hook) => hook.StageComponent,
);

export { StageProvider, useStageComponent, useStageRef };
