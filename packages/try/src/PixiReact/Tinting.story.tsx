import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, Container, Rectangle, Sprite, type Texture } from 'pixi.js';
import { use, useEffect, useRef, type FC } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/basic/tinting Tinting | PixiJS}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load('https://pixijs.com/assets/bunny.png');

  return (
    <>
      <h2>Tinting</h2>

      <Application>
        <BunnySprite texturePromise={texturePromise} />
      </Application>
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
    if (!containerRef.current) return;

    const bunnyList: {
      sprite: Sprite;
      direction: number;
      turningSpeed: number;
      speed: number;
    }[] = [];

    const totalDudes = 20;

    for (let i = 0; i < totalDudes; i++) {
      const sprite = new Sprite(texture);

      sprite.anchor.set(0.5);

      sprite.scale.set(0.8 + Math.random() * 0.3);

      sprite.x = Math.random() * screen.width;
      sprite.y = Math.random() * screen.height;

      sprite.tint = Math.random() * 0xff_ff_ff;

      const direction = Math.random() * Math.PI * 2;

      const turningSpeed = Math.random() - 0.8;

      const speed = 2 + Math.random() * 2;

      containerRef.current.addChild(sprite);
      bunnyList.push({ sprite, direction, turningSpeed, speed });
    }

    const dudeBoundsPadding = 100;

    const dudeBounds = new Rectangle(
      -dudeBoundsPadding,
      -dudeBoundsPadding,
      screen.width + dudeBoundsPadding * 2,
      screen.height + dudeBoundsPadding * 2,
    );

    const animate = () => {
      for (const bunny of bunnyList) {
        bunny.direction += bunny.turningSpeed * 0.01;
        bunny.sprite.x += Math.sin(bunny.direction) * bunny.speed;
        bunny.sprite.y += Math.cos(bunny.direction) * bunny.speed;
        bunny.sprite.rotation = -bunny.direction - Math.PI / 2;

        if (bunny.sprite.x < dudeBounds.x) {
          bunny.sprite.x += dudeBounds.width;
        } else if (bunny.sprite.x > dudeBounds.x + dudeBounds.width) {
          bunny.sprite.x -= dudeBounds.width;
        }

        if (bunny.sprite.y < dudeBounds.y) {
          bunny.sprite.y += dudeBounds.height;
        } else if (bunny.sprite.y > dudeBounds.y + dudeBounds.height) {
          bunny.sprite.y -= dudeBounds.height;
        }
      }
    };

    ticker.add(animate);

    return () => {
      ticker.remove(animate);
    };
  }, [screen.height, screen.width, texture, ticker]);

  return <pixiContainer ref={containerRef} />;
};
