import { css } from '@emotion/css';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import { gutter } from '../../../helpers/Style';
import { Page } from './Page';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

type Props = {
  /** Source URL */
  src: string;
};

type PageProps = ComponentProps<typeof Page>;

/**
 * PDF ファイルを読み込んでテキストデータ込で描画します。
 */
export const PdfViewer = ({ src }: Props) => {
  const pdfPages = useLoadPdfPages(src);

  return (
    <ol className={styleBase}>
      {pdfPages.map(({ pdfPage, viewport }, index) => (
        <li key={index}>
          <Page pdfPage={pdfPage} viewport={viewport} />
        </li>
      ))}
    </ol>
  );
};

/**  A4 互換のピクセル幅 */
const pageWidth = 794;

function useLoadPdfPages(src: string) {
  const [pdfPages, setPdfPages] = useState<PageProps[]>([]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    setPdfPages([]);

    const loadingTask = pdfjsLib.getDocument({ url: src, cMapUrl: 'cmaps/', cMapPacked: true });

    (async () => {
      try {
        const pdf = await loadingTask.promise;
        if (requestId !== requestIdRef.current) return;

        const nextPages = await Promise.all(
          [...Array(pdf.numPages).keys()].map(async (i) => {
            const pdfPage = await pdf.getPage(i + 1);
            const baseViewport = pdfPage.getViewport({ scale: 1 });

            return {
              pdfPage,
              viewport: pdfPage.getViewport({ scale: pageWidth / baseViewport.width }),
            };
          }),
        );

        if (requestId !== requestIdRef.current) return;

        setPdfPages(nextPages);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        if (typeof globalThis.reportError === 'function') {
          globalThis.reportError(error);
          return;
        }

        throw error;
      }
    })();

    return () => {
      requestIdRef.current += 1;
    };
  }, [src]);

  return pdfPages;
}

const styleBase = css`
  display: inline-flex;
  flex-direction: column;
  padding: 0 ${gutter(2)} ${gutter(4)};
  margin: auto;
  list-style: none;

  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;
