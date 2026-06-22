import { css } from '@emotion/css';
import * as pdfjsLib from 'pdfjs-dist';
import { type PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { type PageViewport } from 'pdfjs-dist/types/src/display/page_viewport';
import { useEffect, useRef } from 'react';
import { cssVar } from '../../../helpers/Style';

type Props = {
  pdfPage: PDFPageProxy;
  viewport: PageViewport;
};

/**
 * PDF データのページに相当する箇所をレンダリングします。
 */
export const Page = ({ pdfPage, viewport }: Props) => {
  const canvasRef = useRenderCanvas(pdfPage, viewport);
  const textLayerRef = useRenderTextLayer(pdfPage, viewport);

  return (
    <article className={styleBase}>
      <canvas ref={canvasRef} className={styleCanvas} />
      <div ref={textLayerRef} className={`textLayer ${styleTextLayer}`} />
    </article>
  );
};

function useRenderCanvas(page: PDFPageProxy, viewport: PageViewport) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderTask: ReturnType<PDFPageProxy['render']> | null = null;

    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const outputScale = window.devicePixelRatio || 1;

      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.style.height = `${viewport.height}px`;
      canvas.style.width = `${viewport.width}px`;

      const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

      renderTask = page.render({
        canvas,
        canvasContext,
        viewport,
        transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
      });

      await renderTask.promise.catch((error: unknown) => {
        if (error instanceof Error && cancellationErrorNames.has(error.name)) {
          return;
        }

        if (typeof globalThis.reportError === 'function') {
          globalThis.reportError(error);
          return;
        }

        throw error;
      });
    })();

    return () => {
      renderTask?.cancel();
    };
  }, [page, viewport]);

  return canvasRef;
}

function useRenderTextLayer(page: PDFPageProxy, viewport: PageViewport) {
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = textLayerRef.current;
    const abortController = new AbortController();
    let textLayer: InstanceType<typeof pdfjsLib.TextLayer> | null = null;

    (async () => {
      if (!container) return;

      const textContent = await page.getTextContent();

      if (abortController.signal.aborted) return;

      container.replaceChildren();

      textLayer = new pdfjsLib.TextLayer({
        viewport,
        container,
        textContentSource: textContent,
      });

      container.style.setProperty('--total-scale-factor', `${viewport.scale * viewport.userUnit}`);
      container.style.width = `${viewport.width}px`;
      container.style.height = `${viewport.height}px`;

      await textLayer.render().catch((error: unknown) => {
        if (error instanceof Error && cancellationErrorNames.has(error.name)) {
          return;
        }

        if (typeof globalThis.reportError === 'function') {
          globalThis.reportError(error);
          return;
        }

        throw error;
      });
    })();

    return () => {
      abortController.abort();
      textLayer?.cancel();
      container?.replaceChildren();
    };
  }, [page, viewport]);

  return textLayerRef;
}

const cancellationErrorNames = new Set(['AbortException', 'RenderingCancelledException']);

const styleBase = css`
  position: relative;
  background-color: ${cssVar('TexturePaper')};
`;

const styleTextLayer = css`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: clip;
  line-height: 1;
  text-align: initial;
  word-spacing: normal;
  letter-spacing: normal;
  forced-color-adjust: none;
  opacity: 0.2;
  transform-origin: 0 0;
  text-size-adjust: none;

  --min-font-size: 1;
  --text-scale-factor: calc(var(--total-scale-factor) * var(--min-font-size));
  --min-font-size-inv: calc(1 / var(--min-font-size));

  & :is(span, br) {
    position: absolute;
    color: transparent;
    white-space: pre;
    cursor: text;
    user-select: text;
    transform-origin: 0% 0%;

    ::selection {
      background-color: blue;
    }
  }

  > :not([class~='markedContent']),
  [class~='markedContent'] span:not([class~='markedContent']) {
    z-index: 1;

    --font-height: 0;
    --scale-x: 1;
    --rotate: 0deg;

    font-size: calc(var(--text-scale-factor) * var(--font-height));
    transform: rotate(var(--rotate)) scaleX(var(--scale-x)) scale(var(--min-font-size-inv));
  }

  [class~='markedContent'] {
    display: contents;
  }

  &[data-main-rotation='90'] {
    transform: rotate(90deg) translateY(-100%);
  }

  &[data-main-rotation='180'] {
    transform: rotate(180deg) translate(-100%, -100%);
  }

  &[data-main-rotation='270'] {
    transform: rotate(270deg) translateX(-100%);
  }
`;

const styleCanvas = css`
  display: block;
  box-shadow: ${cssVar('ShadowNeutral')};
`;
