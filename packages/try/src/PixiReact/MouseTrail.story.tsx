// oxlint-disable no-unknown-property
import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, MeshRope, Point, type Texture } from 'pixi.js';
import { type FC, use, useEffect } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/advanced/mouse-trail Mouse Trail | PixiJS}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load('https://pixijs.com/assets/trail.png');

  return (
    <>
      <h2>Mouse Trail</h2>

      <Application backgroundColor="#1099bb" eventMode="static">
        <MouseTrail texturePromise={texturePromise} />
      </Application>
    </>
  );
};

type MouseTrailProps = {
  texturePromise: Promise<Texture>;
};

const MouseTrail: FC<MouseTrailProps> = ({ texturePromise }) => {
  const texture = use(texturePromise);

  // ropeSize determines how smooth the trail will be.
  const ropeSize = 100;

  const points = [...Array(ropeSize).keys()].map(() => new Point(0, 0));

  const {
    app: { ticker, screen, stage },
  } = useApplication();

  useExtend({
    MeshRope,
  });

  useEffect(() => {
    // historySize determines how long the trail will be.
    const historySize = 20;

    const { historyX, historyY } = [...Array(historySize).keys()].reduce<{ historyX: number[]; historyY: number[] }>(
      (acc) => ({
        historyX: [...acc.historyX, 0],
        historyY: [...acc.historyY, 0],
      }),
      { historyX: [], historyY: [] },
    );

    let mousePosition: Point | null = null;

    // eslint-disable-next-line react-hooks/immutability
    stage.hitArea = screen;

    stage.on('mousemove', ({ global }) => {
      mousePosition = mousePosition ?? new Point();
      mousePosition.x = global.x;
      mousePosition.y = global.y;
    });

    const animate = () => {
      if (!mousePosition) return;

      // Update the mouse values to history
      historyX.pop();
      historyX.unshift(mousePosition.x);
      historyY.pop();
      historyY.unshift(mousePosition.y);

      // Update the points to correspond with history.
      for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        // Smooth the curve with cubic interpolation to prevent sharp edges.
        const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
        const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

        p.x = ix;
        p.y = iy;
      }
    };

    const clipInput = (k: number, array: number[]) => {
      const index = k < 0 ? 0 : Math.min(k, array.length - 1);

      return array[index];
    };

    const getTangent = (k: number, factor: number, array: number[]) =>
      (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;

    const cubicInterpolation = (array: number[], t: number, tangentFactor = 1) => {
      const k = Math.floor(t);
      const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)];
      const p = [clipInput(k, array), clipInput(k + 1, array)];

      const t1 = t - k;
      const t2 = t1 * t1;
      const t3 = t1 * t2;

      return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t1) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    };

    ticker.add(animate);

    return () => {
      stage.off('mousemove');
      ticker.remove(animate);
    };
  }, [points, screen, stage, ticker]);

  return <pixiMeshRope texture={texture} points={points} blendMode="add" />;
};
