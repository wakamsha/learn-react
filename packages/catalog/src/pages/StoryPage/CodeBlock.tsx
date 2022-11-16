import { FontFamily, LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import hljs from 'highlight.js';
import { useEffect, useRef } from 'react';

type Props = {
  children: string;
};

export const CodeBlock = ({ children }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightAll();
      hljs.highlightElement(ref.current);
    }
  });

  useEffect(() => {
    // html ファイルにハードコーディングすると `vite build` 時に Linaria が失敗するため、
    // これを回避するため動的に `<link>` 要素を生成して挿入する。
    if (!document.querySelector('link#highlight-theme')) {
      const dom = document.createElement('link');
      dom.rel = 'stylesheet';
      dom.id = 'highlight-theme';
      dom.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-dark.min.css';

      document.head.append(dom);
    }
  }, []);

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
  padding: 0;
  margin: 0;
  overflow: auto;
  background-color: transparent;
  border: none;

  > code {
    height: 100%;
    padding: ${gutter(8)} ${gutter(4)} !important;
    overflow: visible;
    font-family: ${FontFamily.Monospace};
    font-size: 13px;
    line-height: ${LineHeight.Regular};
  }
`;
