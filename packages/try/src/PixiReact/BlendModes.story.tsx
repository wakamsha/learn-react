import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, Container, Sprite, Text, Texture } from 'pixi.js';
import { use, useEffect, useRef, type FC } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/basic/blend-modes Blend Modes | PixiJS}
 */
export const Story: FC = () => {
  const assetsPromise = Assets.load<Texture>([
    {
      alias: 'bunny',
      src: 'https://pixijs.com/assets/bunny.png',
    },
    {
      alias: 'rainbow',
      src: 'https://pixijs.com/assets/rainbow-gradient.png',
    },
  ]);

  return (
    <>
      <h2>Blend Mode</h2>

      <Application antialias useBackBuffer backgroundColor="#ffffff">
        <BunnySprite assetsPromise={assetsPromise} />
      </Application>
    </>
  );
};

type BunnySpriteProps = {
  assetsPromise: Promise<Record<string, Texture>>;
};

const BunnySprite: FC<BunnySpriteProps> = ({ assetsPromise }) => {
  const { bunny, rainbow } = use(assetsPromise);

  const containerRef = useRef<Container>(null);

  const {
    app: { ticker },
  } = useApplication();

  useExtend({
    Container,
  });

  useEffect(() => {
    const allBlendModes = [
      'normal',
      'add',
      'screen',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'linear-burn',
      'linear-dodge',
      'linear-light',
      'hard-light',
      'soft-light',
      'pin-light',
      'difference',
      'exclusion',
      'overlay',
      'saturation',
      'color',
      'luminosity',
      'add-npm',
      'subtract',
      'divide',
      'vivid-light',
      'hard-mix',
      'negation',
    ] as const;

    const itemList: Sprite[] = [];

    const size = 800 / 5;

    allBlendModes.forEach((blendMode, i) => {
      if (!containerRef.current) return;

      const container = new Container();

      const bunnySprite = new Sprite({
        texture: bunny,
        width: 100,
        height: 100,
        anchor: 0.5,
        position: { x: size / 2, y: size / 2 },
      });

      itemList.push(bunnySprite);

      const rainbowSprite = new Sprite({
        texture: rainbow,
        width: size,
        height: size,
        blendMode,
      });

      container.addChild(bunnySprite, rainbowSprite);

      const text = new Text({
        text: blendMode,
        style: {
          fontSize: 16,
          fontFamily: 'short-stack',
        },
      });

      // Add blend mode text labels
      text.x = size / 2 - text.width / 2;
      text.y = size - text.height;

      const textBackground = new Sprite(Texture.WHITE);

      textBackground.x = text.x - 2;
      textBackground.y = text.y;
      textBackground.width = text.width + 4;
      textBackground.height = text.height + 4;

      container.addChild(textBackground, text);

      containerRef.current.addChild(container);

      container.x = (i % 5) * size;
      container.y = Math.floor(i / 5) * size;
    });

    const animate = () => {
      itemList.forEach((item, i) => {
        // oxlint-disable-next-line no-param-reassign
        item.rotation += 0.01 * (i % 2 ? 1 : -1);
      });
    };

    ticker.add(animate);

    return () => {
      ticker.remove(animate);
    };
  }, [bunny, rainbow, ticker]);

  return <pixiContainer ref={containerRef} />;
};
