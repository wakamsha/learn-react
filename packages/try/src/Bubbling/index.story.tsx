import { cssVar, gutter } from '@learn-react/core/helpers/Style';
import { css } from '@linaria/core';
import type { MouseEvent } from 'react';

export const Story = () => {
  const handleClickOuter = (e: MouseEvent<HTMLDivElement>) => {
    console.info('outer', e);
  };

  const handleClickInner = (e: MouseEvent<HTMLButtonElement>) => {
    console.info('inner', e);
  };

  const handleClickLabel = (e: MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    console.info('label', e);
  };

  return (
    <>
      <h2>Bubbling Test</h2>
      <div role="button" className={styleOuter} onClick={handleClickOuter}>
        <p>Outer</p>

        {/* クリックすると Outer までイベントが伝搬する。 */}
        <button onClick={handleClickInner}>Inner</button>

        {/* クリックしても Outer までイベントは伝搬しない。 */}
        <label onClick={handleClickLabel}>
          <input type="checkbox" />
          Inner 2
        </label>
      </div>
    </>
  );
};

const styleOuter = css`
  padding: ${gutter(8)};
  background-color: ${cssVar('ThemeDangerNeutral')};
`;
