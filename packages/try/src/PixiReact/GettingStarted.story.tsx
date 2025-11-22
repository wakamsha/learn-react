// oxlint-disable no-unknown-property
import { Application, useApplication, useExtend, type PixiElements } from '@pixi/react';
import { Assets, Sprite, Text, type Texture } from 'pixi.js';
import { Suspense, use, useRef, useState, type FC } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/tutorials/getting-started#1 getting started | PixiJS}
 *
 * @see {@link https://react.pixijs.io/getting-started/ Getting Started | PixiJS React}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load('https://pixijs.com/assets/bunny.png');

  useExtend({
    Text,
  });

  return (
    <>
      <h2>Getting Started</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Application background="#1099bb">
          <BunnySprite texturePromise={texturePromise} />
          <pixiText text="Hello PixiJS" />
        </Application>
      </Suspense>
    </>
  );
};

type BunnySpriteProps = {
  texturePromise: Promise<Texture>;
} & PixiElements['pixiSprite'];

const BunnySprite: FC<BunnySpriteProps> = ({ texturePromise }) => {
  const texture = use(texturePromise);

  const {
    app: { screen },
  } = useApplication();

  const spriteRef = useRef<Sprite>(null);

  const [hovered, setHovered] = useState(false);

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((active) => !active);
  };

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  useExtend({
    Sprite,
  });

  return (
    <pixiSprite
      ref={spriteRef}
      anchor={0.5}
      eventMode="static"
      scale={active ? 1 : 1.5}
      alpha={hovered ? 1 : 0.5}
      texture={texture}
      x={screen.width / 2}
      y={screen.height / 2}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
};
