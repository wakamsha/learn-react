import { css } from '@linaria/core';
import { useRef } from 'react';
import { cssVar, gutter, textEllipsis } from '../../helpers/Style';
import { useSpy } from './v2';

export const Story = () => {
  const fruits = ['apple', 'orange', 'rotten apple', 'banana', 'cherry'];

  const rootRef = useRef<HTMLDivElement>(null);

  const spy = useSpy(rootRef);

  spy(
    rootElement =>
      [...rootElement.querySelectorAll('[data-spy]')].filter(
        elem => !(elem as HTMLElement).dataset.spy?.startsWith('rotten'),
      ),
    (element: HTMLElement) => {
      if (!element.dataset?.spy) return;
      console.info(element.dataset.spy);
    },
  );

  return (
    <div className={styleWrapper}>
      <div className={styleRoot} ref={rootRef}>
        {fruits.map(name => (
          <div key={name} className={styleContent} data-spy={name}>
            <h2 className={styleLabel}>{name}</h2>
          </div>
        ))}
      </div>
      <pre>
        <code>{JSON.stringify(fruits, null, 2)}</code>
      </pre>
    </div>
  );
};

const styleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(4)};
`;

const styleRoot = css`
  height: 50dvh;
  overflow: auto;
  border: 1px solid ${cssVar('LineNeutral')};

  > :not(:first-child) {
    border-top: 1px solid ${cssVar('LineNeutral')};
  }
`;

const styleContent = css`
  min-height: 500px;
  padding: 0 ${gutter(8)} ${gutter(4)};
`;

const styleLabel = css`
  font-size: 8vh;
  ${textEllipsis()}
`;
