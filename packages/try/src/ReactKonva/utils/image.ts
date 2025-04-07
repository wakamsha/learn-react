/**
 * 指定された URL から画像を非同期に読み込みます。
 *
 * @param src - 読み込む画像の URL。
 *
 * @returns 読み込まれた画像を含む Promise。
 *
 * @example
 * ```typescript
 * const image = await loadImage('https://example.com/image.png');
 * console.log(image.width, image.height);
 * ```
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();

    image.src = src;
    image.addEventListener('load', () => {
      console.info('Image loaded');
      resolve(image);
    });
  });
}
