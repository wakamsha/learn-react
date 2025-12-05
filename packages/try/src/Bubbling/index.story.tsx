import { css } from '@emotion/css';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { type MouseEvent } from 'react';

export const Story = () => {
  const handleClickOuter = (event: MouseEvent<HTMLDivElement>) => {
    console.info('outer', event);
  };

  const handleClickInner = (event: MouseEvent<HTMLButtonElement>) => {
    console.info('inner', event);
  };

  const handleClickLabel = (event: MouseEvent<HTMLLabelElement>) => {
    event.stopPropagation();
    console.info('label', event);
  };

  return (
    <>
      <h2>Bubbling Test</h2>
      {/* oxlint-disable-next-line prefer-tag-over-role */}
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
