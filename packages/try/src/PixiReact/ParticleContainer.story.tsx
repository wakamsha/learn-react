import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, Container, Rectangle, Sprite, type Texture } from 'pixi.js';
import { use, useEffect, useRef, type FC } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/basic/particle-container Particle Container | PixiJS}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load('https://pixijs.com/assets/bunny.png');

  return (
    <>
      <h2>Particle Container</h2>

      <Application background="#1099bb">
        <BunnyStripe texturePromise={texturePromise} />
      </Application>
    </>
  );
};

type BunnySpriteProps = {
  texturePromise: Promise<Texture>;
};

const BunnyStripe: FC<BunnySpriteProps> = ({ texturePromise }) => {
  const texture = use(texturePromise);

  const containerRef = useRef<Container>(null);

  const {
    app: { screen, ticker },
  } = useApplication();

  useExtend({
    Container,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const itemCount = 10_000;
    const itemList: {
      sprite: Sprite;
      direction: number;
      turningSpeed: number;
      speed: number;
      offset: number;
    }[] = [];

    for (let i = 0; i < itemCount; i++) {
      const sprite = new Sprite(texture);

      sprite.anchor.set(0.5);

      sprite.scale.set(0.8 + Math.random() * 0.3);

      sprite.x = Math.random() * screen.width;
      sprite.y = Math.random() * screen.height;

      sprite.tint = Math.random() * 0x80_80_80;

      // Create a random direction in radians
      const direction = Math.random() * Math.PI * 2;

      // This number will be used to modify the direction of the sprite over time
      const turningSpeed = Math.random() - 0.8;

      // Create a random speed between 0 - 2, and these maggots are slow
      const speed = (2 + Math.random() * 2) * 0.2;

      const offset = Math.random() * 100;

      // Finally we push the dude into the maggots array so it it can be easily accessed later
      itemList.push({ sprite, direction, turningSpeed, speed, offset });

      containerRef.current.addChild(sprite);
    }

    // Create a bounding box box for the little maggots
    const dudeBoundsPadding = 100;

    const dudeBounds = new Rectangle(
      -dudeBoundsPadding,
      -dudeBoundsPadding,
      screen.width + dudeBoundsPadding * 2,
      screen.height + dudeBoundsPadding * 2,
    );

    let tick = 0;

    const animate = () => {
      for (const item of itemList) {
        item.sprite.scale.y = 0.95 + Math.sin(tick + item.offset) * 0.05;
        item.direction += item.turningSpeed * 0.01;
        item.sprite.x += Math.sin(item.direction) * (item.speed * item.sprite.scale.y);
        item.sprite.y += Math.cos(item.direction) * (item.speed * item.sprite.scale.y);
        item.sprite.rotation = -item.direction + Math.PI;

        // Wrap the maggots
        if (item.sprite.x < dudeBounds.x) {
          item.sprite.x += dudeBounds.width;
        } else if (item.sprite.x > dudeBounds.x + dudeBounds.width) {
          item.sprite.x -= dudeBounds.width;
        }

        if (item.sprite.y < dudeBounds.y) {
          item.sprite.y += dudeBounds.height;
        } else if (item.sprite.y > dudeBounds.y + dudeBounds.height) {
          item.sprite.y -= dudeBounds.height;
        }
      }
      tick += 0.1;
    };

    ticker.add(animate);

    return () => {
      ticker.remove(animate);
    };
  }, [screen.height, screen.width, texture, ticker]);

  return <pixiContainer ref={containerRef} />;
};
