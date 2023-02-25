import { css } from '@linaria/core';
import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useSpy } from '.';
import { cssVar, gutter, textEllipsis } from '../../helpers/Style';
import { useScrollTo } from '../useScrollTo';

export const Story = () => {
  const fruits = ['apple', 'orange', 'rotten apple', 'banana', 'cherry'];

  const [target, setTarget] = useState('');

  const [spyKey, setSpyKey] = useState('');

  const [offset, setOffset] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);

  const spy = useSpy({ rootRef, offset });

  const scrollTo = useScrollTo({ rootRef, offset });

  const onSpyChange = (e: HTMLElement) => {
    if (!e.dataset?.spy) return;
    setSpyKey(e.dataset.spy);
  };

  const handleSelectNav = (e: MouseEvent<HTMLAnchorElement>, name: string) => {
    e.preventDefault();

    setTarget(name);
    scrollTo((root) => root.querySelector(`[data-spy="${name}"]`));
  };

  const onChangeOffset = (e: ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(e.target.value));
  };

  spy(
    (root) =>
      [...root.querySelectorAll('[data-spy]')].filter((e) => !(e as HTMLElement).dataset.spy?.startsWith('rotten')),
    onSpyChange,
  );

  return (
    <div className={styleWrapper}>
      <div className={styleControls} style={{ gridArea: 'controls' }}>
        <ul className={styleNavigation}>
          {fruits.map((name) => (
            <li key={name}>
              <a href={`#${name}`} onClick={(e) => handleSelectNav(e, name)}>
                {name}
              </a>
            </li>
          ))}
        </ul>
        <label className={styleRange}>
          <strong>
            offset: <code>{offset}</code>
          </strong>
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
          <code>{JSON.stringify({ spyKey, target }, null, 2)}</code>
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
  grid-template:
    200px 1fr auto 'controls content'
    'log      log';
  gap: 0 ${gutter(4)};
`;

const styleControls = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(4)};
`;

const styleNavigation = css`
  padding-left: 1em;
  list-style: circle;

  > li > a {
    display: block;
  }
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
