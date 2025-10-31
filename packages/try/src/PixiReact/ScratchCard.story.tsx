// oxlint-disable no-unknown-property
import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, type FederatedPointerEvent, Graphics, Point, RenderTexture, Sprite, type Texture } from 'pixi.js';
import { type FC, use, useEffect } from 'react';

export const Story: FC = () => {
  const assetsPromise = Assets.load([
    { alias: 'grass', src: 'https://pixijs.com/assets/bg_grass.jpg' },
    { alias: 'rotate', src: 'https://pixijs.com/assets/bg_rotate.jpg' },
  ]);

  return (
    <>
      <h2>Scratch Card</h2>

      <Application eventMode="static">
        <ScratchCard assetsPromise={assetsPromise} />
      </Application>
    </>
  );
};

type ScratchCardProps = {
  assetsPromise: Promise<Record<'grass' | 'rotate', Texture>>;
};

const ScratchCard: FC<ScratchCardProps> = ({ assetsPromise }) => {
  const { grass, rotate } = use(assetsPromise);

  const {
    app: { renderer, screen, stage },
  } = useApplication();

  const renderTexture = RenderTexture.create({
    width: screen.width,
    height: screen.height,
  });

  const renderTextureSprite = new Sprite(renderTexture);

  useExtend({
    Sprite,
  });

  useEffect(() => {
    const brush = new Graphics().circle(0, 0, 20).fill({ color: 0xff_ff_ff });

    // Create a line that will interpolate the drawn points
    const line = new Graphics();

    let dragging = false;
    let lastDrawnPoint: Point | null = null;

    const pointerMove = ({ global: { x, y } }: FederatedPointerEvent) => {
      if (!dragging) return;

      brush.position.set(x, y);

      renderer.render({
        container: brush,
        target: renderTexture,
        clear: false,
        // skipUpdateTransform: false,
      });

      // Smooth out the drawing a little bit to make it look nicer
      // this connects the previous drawn point to the current one
      // using a line
      if (lastDrawnPoint) {
        line.clear().moveTo(lastDrawnPoint.x, lastDrawnPoint.y).lineTo(x, y).stroke({ width: 40, color: 0xff_ff_ff });
        renderer.render({
          container: line,
          target: renderTexture,
          clear: false,
          // skipUpdateTransform: false,
        });
      }

      lastDrawnPoint = lastDrawnPoint ?? new Point();

      lastDrawnPoint.set(x, y);
    };

    const pointerDown = (event: FederatedPointerEvent) => {
      dragging = true;
      pointerMove(event);
    };

    const pointerUp = () => {
      dragging = false;
      lastDrawnPoint = null;
    };

    stage.hitArea = screen;

    stage
      .on('pointerdown', pointerDown)
      .on('pointerup', pointerUp)
      .on('pointerupoutside', pointerUp)
      .on('pointermove', pointerMove);
  }, [renderTexture, renderer, screen, stage]);

  return (
    <>
      <pixiSprite texture={grass} width={screen.width} height={screen.height} />
      <pixiSprite texture={rotate} mask={renderTextureSprite} />
    </>
  );
};
