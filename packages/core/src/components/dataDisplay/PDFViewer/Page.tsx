import { css, cx } from '@emotion/css';
import * as pdfjsLib from 'pdfjs-dist';
import { type PDFPageProxy, type TextStyle } from 'pdfjs-dist/types/src/display/api';
import { type PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
import { useEffect, useRef } from 'react';
import { cssVar } from '../../../helpers/Style';

type Props = {
  pdfPage: PDFPageProxy;
  viewportForCanvas: PageViewport;
  viewportForTextLayer: PageViewport;
};

/**
 * PDF データのページに相当する箇所をレンダリングします。
 */
export const Page = ({ pdfPage, viewportForCanvas, viewportForTextLayer }: Props) => {
  const canvasRef = useRenderCanvas(pdfPage, viewportForCanvas);
  const textLayerRef = useRenderTextLayer(pdfPage, viewportForTextLayer);

  const cssVariableStyle = createCssVariableStyle(viewportForTextLayer.scale);

  return (
    <article className={styleBase}>
      <canvas ref={canvasRef} className={styleCanvas} />
      <div ref={textLayerRef} className={cx(cssVariableStyle, styleTextLayer)} />
    </article>
  );
};

function useRenderCanvas(page: PDFPageProxy, viewport: PageViewport) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Hooksで管理すると、再レンダリングが走ってしまうため避けている
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.height = `${viewport.height / 2}px`;
      canvas.style.width = `${viewport.width / 2}px`;

      const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

      await page.render({ canvas, viewport, canvasContext }).promise;
    })();
  }, [canvasRef, page, viewport]);

  return canvasRef;
}

function useRenderTextLayer(page: PDFPageProxy, viewport: PageViewport) {
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const container = textLayerRef.current;
      if (!container) return;

      const textContent = await page.getTextContent();

      Object.entries<TextStyle>(textContent.styles).forEach(([key, value]) => {
        if (value.fontFamily !== 'sans-serif') return;
        textContent.styles[key].fontFamily = textContent.styles[key].fontFamily.replace(/sans-serif/, 'serif');
      });

      const textLayer = new pdfjsLib.TextLayer({
        viewport,
        container,
        textContentSource: textContent,
      });

      await textLayer.render();
    })();
  }, [textLayerRef, page, viewport]);

  return textLayerRef;
}

const styleBase = css`
  position: relative;
  background-color: ${cssVar('TexturePaper')};
`;

const styleTextLayer = css`
  position: absolute;
  inset: 0;
  overflow: hidden;
  line-height: 1;
  opacity: 0.2;

  > span {
    position: absolute;
    color: transparent;
    white-space: pre;
    transform-origin: 0% 0%;

    ::selection {
      background-color: blue;
    }
  }
`;

const styleCanvas = css`
  box-shadow: ${cssVar('ShadowNeutral')};
`;

function createCssVariableStyle(totalScaleFactor: number) {
  return css`
    --total-scale-factor: ${totalScaleFactor};
  `;
}
