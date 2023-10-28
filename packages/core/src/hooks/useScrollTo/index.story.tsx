import { css } from '@emotion/css';
import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import { useScrollTo } from '.';
import { cssVar, gutter, textEllipsis } from '../../helpers/Style';

export const Story = () => {
  const fruits = ['apple', 'orange', 'rotten apple', 'banana', 'cherry'];

  const [target, setTarget] = useState('');

  const [offset, setOffset] = useState(0);
  const [scrollBehavior, setScrollBehavior] = useState<'auto' | 'smooth'>('smooth');

  const rootRef = useRef<HTMLDivElement>(null);

  const scrollTo = useScrollTo({
    rootRef,
    offset,
    behavior: scrollBehavior,
  });

  const handleSelectNav = (e: MouseEvent<HTMLAnchorElement>, name: string) => {
    e.preventDefault();

    scrollTo(
      (root) => root.querySelector(`[data-spy="${name}"]`),
      () => {
        setTarget(name);
      },
    );
  };

  const onChangeOffset = (e: ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(e.target.value));
  };

  const handleChangeScrollBehavior = (e: ChangeEvent<HTMLInputElement>) => {
    setScrollBehavior(e.target.value as typeof scrollBehavior);
  };

  return (
    <div className={styleWrapper}>
      <div className={styleControls} style={{ gridArea: 'controls' }}>
        <ul className={styleNavigation}>
          {fruits.map((name) => (
            <li key={name}>
              <a
                href={`#${name}`}
                onClick={(e) => {
                  handleSelectNav(e, name);
                }}
              >
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
        <div>
          <strong>Scroll Behavior:</strong>
          <div className={styleRadioGroup}>
            <label>
              <input
                type="radio"
                name="scrollBehavior"
                value="auto"
                checked={scrollBehavior === 'auto'}
                onChange={handleChangeScrollBehavior}
              />
              auto (no animation)
            </label>
            <label>
              <input
                type="radio"
                name="scrollBehavior"
                value="smooth"
                checked={scrollBehavior === 'smooth'}
                onChange={handleChangeScrollBehavior}
              />
              smooth
            </label>
          </div>
        </div>
      </div>

      <div ref={rootRef} className={styleRoot} style={{ gridArea: 'content' }}>
        {fruits.map((name) => (
          <div key={name} className={styleContent} data-spy={name}>
            <h2 className={styleLabel}>{name}</h2>
          </div>
        ))}
      </div>

      <pre style={{ gridArea: 'log' }}>
        <code>{JSON.stringify({ target }, null, 2)}</code>
      </pre>
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

const styleRadioGroup = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(1)};
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
