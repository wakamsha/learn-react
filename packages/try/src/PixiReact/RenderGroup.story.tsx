// oxlint-disable no-unknown-property
import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, Container, Sprite, type Texture } from 'pixi.js';
import { type FC, use, useEffect, useRef } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/basic/render-group Render Group | PixiJS}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load(`https://pixijs.com/assets/tree.png`);

  return (
    <>
      <h2>Render Group</h2>

      <Application backgroundColor="brown">
        <Tree texturePromise={texturePromise} />
      </Application>
    </>
  );
};

type TreeProps = {
  texturePromise: Promise<Texture>;
};

const Tree: FC<TreeProps> = ({ texturePromise }) => {
  const texture = use(texturePromise);

  const containerRef = useRef<Container>(null);

  const {
    app: { canvas, renderer, ticker },
  } = useApplication();

  const worldSize = 5000;

  useExtend({
    Container,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    for (let i = 0; i < 100_000; i++) {
      const yPosition = Math.random() * worldSize;

      const tree = new Sprite({
        texture,
        x: Math.random() * worldSize,
        y: yPosition,
        scale: 0.25,
        anchor: 0.5,
      });

      containerRef.current.addChild(tree);
    }
  }, [texture]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    let x = 0;
    let y = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      x = event.clientX;
      y = event.clientY;
    };

    const animate = () => {
      const screenWidth = renderer.width;
      const screenHeight = renderer.height;

      const targetX = (x / screenWidth) * (worldSize - screenWidth);
      const targetY = (y / screenHeight) * (worldSize - screenHeight);

      container.x += (-targetX - container.x) * 0.1;
      container.y += (-targetY - container.y) * 0.1;
    };

    canvas.addEventListener('mousemove', onMouseMove);

    ticker.add(animate);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      ticker.remove(animate);
    };
  }, [renderer, ticker, canvas]);

  return <pixiContainer ref={containerRef} isRenderGroup />;
};
