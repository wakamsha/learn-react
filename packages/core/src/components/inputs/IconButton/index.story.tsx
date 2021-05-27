import { css } from '@emotion/css';
import { IconButton } from '.';
import { gutter } from '../../../helpers/Style';

export const Story = () => (
  <>
    <h2>Solid</h2>
    <div className={styleRow}>
      <IconButton name="plus" onClick={console.info} ariaLabel="追加する" />
      <IconButton name="plus" theme="danger" onClick={console.info} />
      <IconButton name="plus" disabled onClick={console.info} />
    </div>

    <h2>Ghost</h2>
    <div className={styleRow}>
      <IconButton name="plus" variant="ghost" onClick={console.info} />
      <IconButton name="plus" variant="ghost" theme="danger" onClick={console.info} />
      <IconButton name="plus" variant="ghost" disabled onClick={console.info} />
    </div>

    <h2>Bare</h2>
    <div className={styleRow}>
      <IconButton name="plus" variant="bare" onClick={console.info} />
      <IconButton name="plus" variant="bare" theme="danger" onClick={console.info} />
      <IconButton name="plus" variant="bare" disabled onClick={console.info} />
    </div>

    <h2>Size</h2>
    <div className={styleRow}>
      <IconButton name="plus" onClick={console.info} />
      <IconButton name="plus" size="small" onClick={console.info} />
    </div>
    <div className={styleRow}>
      <IconButton name="plus" variant="ghost" onClick={console.info} />
      <IconButton name="plus" variant="ghost" size="small" onClick={console.info} />
    </div>
    <div className={styleRow}>
      <IconButton name="plus" variant="bare" onClick={console.info} />
      <IconButton name="plus" variant="bare" size="small" onClick={console.info} />
    </div>
  </>
);

const styleRow = css`
  & + & {
    margin-top: ${gutter(4)};
  }

  > :not(:first-child) {
    margin-left: ${gutter(6)};
  }
`;
