import { css } from '@emotion/css';
import { gutter } from '../../../helpers/Style';
import { IconButton } from '.';

export const Story = () => (
  <>
    <h3>Solid</h3>
    <div className={styleRow}>
      <IconButton name="plus" onClick={console.info} ariaLabel="追加する" />
      <IconButton name="plus" theme="danger" onClick={console.info} />
      <IconButton name="plus" disabled onClick={console.info} />
    </div>

    <h3>Ghost</h3>
    <div className={styleRow}>
      <IconButton name="plus" variant="ghost" onClick={console.info} />
      <IconButton name="plus" variant="ghost" theme="danger" onClick={console.info} />
      <IconButton name="plus" variant="ghost" disabled onClick={console.info} />
    </div>

    <h3>Bare</h3>
    <div className={styleRow}>
      <IconButton name="plus" variant="bare" onClick={console.info} />
      <IconButton name="plus" variant="bare" theme="danger" onClick={console.info} />
      <IconButton name="plus" variant="bare" disabled onClick={console.info} />
    </div>

    <h3>Size</h3>
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
