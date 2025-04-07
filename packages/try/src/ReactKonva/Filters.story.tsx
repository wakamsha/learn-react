import Konva from 'konva';
import { use, useEffect, useRef, useState, type ComponentProps, type FC } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import { loadImage } from './utils/image';

/**
 * @see {@link https://konvajs.org/docs/react/Filters.html Filters}
 */
export const Story: FC = () => {
  const imagePromise = loadImage('https://konvajs.org/assets/lion.png');

  return (
    <>
      <h2>How to apply canvas filters with React and Konva?</h2>

      <Stage width={600} height={720}>
        <Layer>
          <FilteredRect draggable />
          <FilteredImage imagePromise={imagePromise} />
        </Layer>
      </Stage>
    </>
  );
};

type FilteredRectProps = Pick<ComponentProps<typeof Rect>, 'draggable'>;

const FilteredRect: FC<FilteredRectProps> = ({ draggable }) => {
  const [color, setColor] = useState('green');

  const rectRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    if (rectRef.current) {
      rectRef.current.cache();
    }
  });

  const handleClick = () => {
    setColor(Konva.Util.getRandomColor());
    // recache shape when we updated it
    rectRef.current?.cache();
  };

  return (
    <Rect
      ref={rectRef}
      draggable={draggable}
      filters={[Konva.Filters.Noise]}
      noise={1}
      x={200}
      y={10}
      width={150}
      height={150}
      fill={color}
      shadowBlur={10}
      onClick={handleClick}
    />
  );
};

type FilteredImageProps = {
  imagePromise: Promise<HTMLImageElement>;
};

const FilteredImage: FC<FilteredImageProps> = ({ imagePromise }) => {
  const image = use(imagePromise);

  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.cache();
    }
  });

  return <Image ref={imageRef} x={10} y={10} image={image} filters={[Konva.Filters.Blur]} blurRadius={100} />;
};
