import { PdfViewer } from '.';

export const Story = () => {
  const src = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

  return <PdfViewer src={src} />;
};
