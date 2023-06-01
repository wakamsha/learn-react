import { css } from '@emotion/css';
import { useState } from 'react';
import { useClickOutside } from '.';
import { cssVar, gutter, square } from '../../helpers/Style';

export const Story = () => {
  const [enabled, setEnabled] = useState(true);

  const [count, setCount] = useState(0);

  const handleClickOutside = (event: Event) => {
    setCount((count) => count + 1);

    console.info(`outside was clicked`, event);
  };

  const ref = useClickOutside<HTMLDivElement>(handleClickOutside, enabled);

  const handleToggleEnabled = () => {
    setEnabled(!enabled);
  };

  return (
    <div className={styleRoot}>
      <div className={styleOutside}>
        <div ref={ref} className={styleInside}>
          Inside
        </div>
      </div>

      <p>
        Count: <b>{count}</b>
      </p>

      <label className={styleLabel}>
        <input type="checkbox" checked={enabled} onChange={handleToggleEnabled} />
        Enabled
      </label>
    </div>
  );
};

const styleRoot = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(4)};
`;

const styleOutside = css`
  display: grid;
  place-content: center;
  background-color: ${cssVar('TexturePale')};
  border: 1px solid ${cssVar('LineLight')};

  ${square(240)}
`;

const styleInside = css`
  display: grid;
  place-content: center;
  color: ${cssVar('TextNeutral')};
  background-color: ${cssVar('TextureBody')};
  border: 1px solid ${cssVar('LineNeutral')};

  ${square(120)}
`;

const styleLabel = css`
  display: flex;
  gap: ${gutter(1)};
  align-items: center;
`;
