import type Konva from 'konva';
import { type FC, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

/**
 * @see {@link https://konvajs.org/docs/react/Canvas_Export.html Canvas Export}
 */
export const Story: FC = () => {
  const stageRef = useRef<Konva.Stage>(null);

  const stageWidth = 600;
  const stageHeight = 720;

  const handleExport = () => {
    const uri = stageRef.current?.toDataURL();

    if (!uri) {
      return;
    }

    console.info({ uri });

    downloadUri(uri, 'stage.png');
  };

  return (
    <>
      <h2>How to export a canvas into an image from react-konva?</h2>

      <button onClick={handleExport}>Export</button>

      <Stage ref={stageRef} width={stageWidth} height={stageHeight}>
        <Layer>
          <Rect x={0} y={0} width={80} height={80} fill="red" />
          <Rect x={stageWidth - 80} y={0} width={80} height={80} fill="red" />
          <Rect x={stageWidth - 80} y={stageHeight - 80} width={80} height={80} fill="red" />
          <Rect x={0} y={stageHeight - 80} width={80} height={80} fill="red" />
        </Layer>
      </Stage>
    </>
  );
};

function downloadUri(uri: string, filename: string) {
  const link = document.createElement('a');

  link.download = filename;
  link.href = uri;

  document.body.append(link);
  link.click();
  link.remove();
}
