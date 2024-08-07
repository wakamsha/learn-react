import { css } from '@emotion/css';
import { useRef, useState, type ChangeEvent } from 'react';
import { useSpy } from '.';
import { cssVar, gutter, textEllipsis } from '../../helpers/Style';

export const Story = () => {
  const fruits = ['apple', 'orange', 'rotten apple', 'banana', 'cherry'];

  const rootRef = useRef<HTMLDivElement>(null);

  const [spyKey, setSpyKey] = useState('');

  const [offset, setOffset] = useState(0);

  const spy = useSpy({ rootRef, offset });

  const onChangeOffset = (event: ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(event.target.value));
  };

  const onSpyChange = (event: HTMLElement, index: number) => {
    if (!event.dataset.spy) return;
    console.info(index, event.dataset.spy);

    setSpyKey(event.dataset.spy);
  };

  spy(
    // spy('[data-spy]', onSpyChange) のようにセレクターに文字列だけ渡すこともできるが、
    // このような高度な選び方も可能。
    (element) =>
      [...element.querySelectorAll('[data-spy]')].filter(
        (innerElement) => !(innerElement as HTMLElement).dataset.spy?.startsWith('rotten'),
      ),
    onSpyChange,
  );

  return (
    <div className={styleWrapper}>
      <div style={{ gridArea: 'controls' }}>
        <label className={styleRange}>
          <span>
            offset: <code>{offset}</code>
          </span>
          <input type="range" min={-100} max={100} step={10} value={offset} onChange={onChangeOffset} />
        </label>
      </div>

      <div ref={rootRef} className={styleRoot} style={{ gridArea: 'content' }}>
        {fruits.map((name) => (
          <div key={name} className={styleContent} data-spy={name}>
            <h2 className={styleLabel}>{name}</h2>
          </div>
        ))}
      </div>

      <div style={{ gridArea: 'log' }}>
        <pre>
          <code>{JSON.stringify({ spyKey }, null, 2)}</code>
        </pre>
        <p>
          <code>rotten apple</code> のみ spy イベントは発火しない。
        </p>
      </div>
    </div>
  );
};

const styleWrapper = css`
  display: grid;
  grid-template-areas:
    'controls content'
    'log log';
  grid-template-rows: auto;
  grid-template-columns: 200px 1fr;
  gap: 0 ${gutter(4)};
`;

const styleRange = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const styleRoot = css`
  height: 50vh;
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
