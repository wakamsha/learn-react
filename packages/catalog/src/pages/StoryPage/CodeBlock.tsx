import { css } from '@emotion/css';
import { FontFamily, LineHeight } from '@learn-react/core/constants/Style';
import { gutter } from '@learn-react/core/helpers/Style';
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
