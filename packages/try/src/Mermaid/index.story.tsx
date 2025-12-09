import mermaid from 'mermaid';
import { useEffect, useId, useRef, type FC } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export const Story: FC = () => {
  const markdownContent = `
## 📖 Background

At Money Forward, MF Technical Standards serve as a foundational framework to ensure consistency, quality, and long-term maintainability across our software development practices. Within this framework, the Development Standards provide practical guidance for engineers in their day-to-day work. These Development Standards are maintained by the Technology Strategy Division, MF-CTO Office.

The Development Standards aim to help engineers understand how to develop software in a way that aligns with our engineering principles and organizational goals. Rather than acting as a strict rule book, they provide context and intent behind our shared practices, helping teams make sound technical decisions.

### 📋 About Standardization

- en: [From the CTO’s Desk - 2024 4Q](https://moneyforward.kibe.la/notes/310584#standardization)
- ja: [考えていることの共有：2024年4Q](https://moneyforward.kibe.la/notes/310583#%E6%A8%99%E6%BA%96%E5%8C%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

## 🏷️ Standardization Types

### 🛡️ Standard

**Definition/Policy (what & why):**
A **mandatory**, versioned requirement that sets the minimum bar for quality, performance, security, reliability, or compliance across a defined scope.
Uses RFC-2119 (MUST / MUST NOT) and is objectively testable or verifiable with controls.

**Implementation/SDK/Controls (how):**
An implementation (boilerplates, shared libraries, SDKs, IaC modules, linters, scripts) that enables users to efficiently apply the defined standard.
Controls SHOULD be integrated into CI/CD or runtime.

### 🗡 Best Practice

**Definition/Policy (what & why):**
A **recommended** requirement with strong evidence of practical value.
Uses RFC-2119 (SHOULD / MAY) and deviations are fine with rationale.

**Implementation/SDK (how):**
An implementation (boilerplates, shared libraries, SDKs, IaC modules, linters, scripts) that enables users to efficiently apply the defined best practice.

\`\`\`typescript
const foo: number = 123;
\`\`\`

\`\`\`mermaid
 graph TD
      MF[MF]
      MF -->|Mandatory<br/>if applicable| Standard
      MF -->|Recommended| BestPractice[Best Practice]

      Standard:::standardStyle
      BestPractice:::bestPracticeStyle

      Standard --- StdDef[Definition/Policy]
      Standard --- StdImpl[Implementation/SDK]

      BestPractice -.- BpDef[Definition/Policy]
      BestPractice -.- BpImpl[Implementation/SDK]

      StdDef:::standardStyle
      StdImpl:::standardStyle
      BpDef:::bestPracticeStyle
      BpImpl:::bestPracticeStyle
\`\`\`
  `;

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeComponent,
      }}
    >
      {markdownContent}
    </Markdown>
  );
};

type MermaidProps = {
  src: string;
};

const Mermaid: FC<MermaidProps> = ({ src }) => {
  const outputRef = useRef<HTMLDivElement>(null);

  const id = useId();

  useEffect(() => {
    const render = async () => {
      if (src && outputRef.current) {
        try {
          console.info('Rendering Mermaid diagram with id:', id);
          const { svg } = await mermaid.render(id, src);
          outputRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid render error:', error);
          outputRef.current.innerHTML = `<pre style="color: red;">Error rendering Mermaid diagram</pre>`;
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    render();
  }, [src, id]);

  return src ? <div ref={outputRef} /> : null;
};

const CodeComponent: FC<any> = ({ node, className, children, ...props }) => {
  if (className === 'language-mermaid' && node?.children[0].type === 'text') {
    return <Mermaid src={node.children[0].value} />;
  }
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};
