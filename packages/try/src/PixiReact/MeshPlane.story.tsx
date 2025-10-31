// oxlint-disable no-unknown-property
import { Application, useApplication, useExtend } from '@pixi/react';
import { Assets, MeshPlane, type Texture } from 'pixi.js';
import { type FC, use, useEffect, useRef } from 'react';

/**
 * @see {@link https://pixijs.com/8.x/examples/basic/mesh-plane Mesh Plane | PixiJS}
 */
export const Story: FC = () => {
  const texturePromise = Assets.load('https://pixijs.com/assets/bg_grass.jpg');

  return (
    <>
      <h2>Mesh Plane</h2>

      <Application backgroundColor="#1099bb">
        <Plane texturePromise={texturePromise} />
      </Application>
    </>
  );
};

type MeshPlaneProps = {
  texturePromise: Promise<Texture>;
};

const Plane: FC<MeshPlaneProps> = ({ texturePromise }) => {
  const texture = use(texturePromise);

  const meshPlaneRef = useRef<MeshPlane>(null);

  const {
    app: { ticker },
  } = useApplication();

  useExtend({
    MeshPlane,
  });

  useEffect(() => {
    if (!meshPlaneRef.current) return;
    const { buffer } = meshPlaneRef.current.geometry.getAttribute('aPosition');

    let timer = 0;

    const animate = () => {
      if (!meshPlaneRef.current) return;
      for (let i = 0; i < buffer.data.length; i++) {
        buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
      }
      buffer.update();
      timer += 1;
    };

    ticker.add(animate);

    return () => {
      ticker.remove(animate);
    };
  }, [ticker]);

  return <pixiMeshPlane ref={meshPlaneRef} texture={texture} verticesX={10} verticesY={10} x={100} y={100} />;
};
