/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { css } from '@emotion/css';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { type PDFPageProxy } from 'pdfjs-dist/types/src/display/api';
import { useEffect, useState, type ComponentProps } from 'react';
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
      {pdfPages.map(({ pdfPage, viewportForCanvas, viewportForTextLayer }, index) => (
        <li key={index}>
          <Page pdfPage={pdfPage} viewportForCanvas={viewportForCanvas} viewportForTextLayer={viewportForTextLayer} />
        </li>
      ))}
    </ol>
  );
};

/**  A4 互換のピクセル幅 */
const pageWidth = 794;

function useLoadPdfPages(src: string) {
  const [pdfPages, setPdfPages] = useState<PageProps[]>([]);

  useEffect(() => {
    (async () => {
      const pdf = await pdfjsLib.getDocument({ url: src, cMapUrl: 'cmaps/', cMapPacked: true }).promise;

      const loadPdfPages = await Promise.all(
        [...Array(pdf.numPages).keys()].map(async (i) => getPageProps(await pdf.getPage(i + 1), pageWidth)),
      );

      setPdfPages(loadPdfPages);
    })();
  }, [src]);

  return pdfPages;
}

function getPageProps(from: PDFPageProxy, width: number) {
  return {
    pdfPage: from,
    viewportForCanvas: from.getViewport({ scale: (width * 2) / from.getViewport({ scale: 1 }).width }),
    viewportForTextLayer: from.getViewport({ scale: width / from.getViewport({ scale: 1 }).width }),
  };
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
