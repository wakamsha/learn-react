import { css } from '@emotion/css';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFPageProxy, TextContent, TextStyle } from 'pdfjs-dist/types/display/api';
import { PageViewport } from 'pdfjs-dist/types/display/display_utils';
import { useEffect, useRef } from 'react';
import { Color, Shadow } from '../../../constants/Style';

type Props = {
  pdfPage: PDFPageProxy;
  viewportForCanvas: PageViewport;
  viewportForTextLayer: PageViewport;
};

export const Page = ({ pdfPage, viewportForCanvas, viewportForTextLayer }: Props) => {
  const canvasRef = useRenderCanvas(pdfPage, viewportForCanvas);
  const textLayerRef = useRenderTextLayer(pdfPage, viewportForTextLayer);

  return (
    <article className={styleBase}>
      <canvas ref={canvasRef} className={styleCanvas} />
      <div ref={textLayerRef} className={styleTextLayer} />
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

      await page.render({ viewport, canvasContext }).promise;
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

      const textContent: TextContent = await page.getTextContent();

      if (textContent.styles) {
        Object.entries(textContent.styles).forEach(([key, value]: [string, TextStyle]) => {
          if (value.fontFamily !== 'sans-serif') return;
          textContent.styles[key].fontFamily = 'Noto Sans Japanese';
        });
      }

      pdfjsLib.renderTextLayer({ textContent, viewport, container });
    })();
  }, [textLayerRef, page, viewport]);

  return textLayerRef;
}

const styleBase = css`
  position: relative;
  background-color: ${Color.TexturePaper};
`;

const styleTextLayer = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
  box-shadow: ${Shadow.Neutral};
`;
