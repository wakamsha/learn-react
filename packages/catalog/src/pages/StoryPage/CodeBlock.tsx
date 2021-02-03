import { css } from '@emotion/css';
import { FontFamily, LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import * as hljs from 'highlight.js';
import { useEffect, useRef } from 'react';

type Props = {
  children: string;
};

export const CodeBlock = ({ children }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      hljs.initHighlighting();
      hljs.highlightBlock(ref.current);
    }
  });

  return (
    <pre className={styleBase}>
      <code className="typescript" ref={ref}>
        {children}
      </code>
    </pre>
  );
};

const styleBase = css`
  height: 100%;
  padding: ${gutter(8)} ${gutter(4)};
  margin: 0;
  overflow: auto;
  background: transparent;
  border: none;

  > code {
    padding: 0;
    overflow: visible;
    font-family: ${FontFamily.Monospace};
    font-size: 13px;
    line-height: ${LineHeight.Regular};
  }
`;
