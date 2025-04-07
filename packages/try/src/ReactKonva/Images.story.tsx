import { type FC, Suspense, use } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import { loadImage } from './utils/image';

/**
 * @remarks
 * 公式チュートリアルでは画像を読み込むために `use-image` というカスタムフックを使用していますが、
 * ここでは React の組み込みフックである `use` を使って画像を読み込む方法を紹介します。
 *
 * @see {@link https://konvajs.org/docs/react/Images.html Images}
 */
export const Story: FC = () => {
  const imagePromise = loadImage('https://konvajs.org/assets/lion.png');

  return (
    <>
      <h2>How to draw images on canvas with React?</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Stage width={600} height={720}>
          <Layer>
            <MyImage imagePromise={imagePromise} />
          </Layer>
        </Stage>
      </Suspense>
    </>
  );
};

type InternalProps = {
  imagePromise: Promise<HTMLImageElement>;
};

const MyImage: FC<InternalProps> = ({ imagePromise }) => {
  const image = use(imagePromise);

  return <Image image={image} x={100} y={100} width={200} height={200} />;
};
