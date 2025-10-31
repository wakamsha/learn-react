// oxlint-disable no-unknown-property
import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, Container, Sprite, Text, type Texture, type Ticker } from 'pixi.js';
import { Suspense, use, useEffect, useRef, type FC } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/basic/container Container | PixiJS}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load('https://pixijs.com/assets/bunny.png');

  useExtend({
    Text,
  });

  return (
    <>
      <h2>Fish Pond</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Application background="#1099bb">
          <BunnySprite texturePromise={texturePromise} />
        </Application>
      </Suspense>
    </>
  );
};

type BunnySpriteProps = {
  texturePromise: Promise<Texture>;
};

const BunnySprite: FC<BunnySpriteProps> = ({ texturePromise }) => {
  const texture = use(texturePromise);

  const containerRef = useRef<Container>(null);

  const {
    app: { screen, ticker },
  } = useApplication();

  useExtend({
    Container,
    Sprite,
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.pivot.x = containerRef.current.width / 2;
      containerRef.current.pivot.y = containerRef.current.height / 2;
    }
  }, []);

  useEffect(() => {
    const animate = (time: Ticker) => {
      if (!containerRef.current) return;
      containerRef.current.rotation -= 0.01 * time.deltaTime;
    };

    ticker.add(animate);

    return () => {
      ticker.remove(animate);
    };
  }, [ticker]);

  return (
    <pixiContainer ref={containerRef} x={screen.width / 2} y={screen.height / 2}>
      {[...Array(25).keys()].map((index) => (
        <pixiSprite key={index} texture={texture} x={(index % 5) * 40} y={Math.floor(index / 5) * 40} />
      ))}
    </pixiContainer>
  );
};
