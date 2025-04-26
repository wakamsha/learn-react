import { type FC, use } from 'react';
import { Image } from 'react-konva';

type Props = {
  /**
   * The image to be displayed.
   */
  imagePromise: Promise<HTMLImageElement>;
};

/**
 * ImageViewer component to display an image using Konva.
 */
export const ImageViewer: FC<Props> = ({ imagePromise }) => {
  const image = use(imagePromise);

  return <Image image={image} x={0} y={0} width={image.width} height={image.height} />;
};
