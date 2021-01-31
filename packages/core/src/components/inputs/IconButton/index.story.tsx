import { css } from '@emotion/css';
import { gutter } from '../../helpers/Style';
import { IconButton } from '.';

export const Story = () => (
  <>
    <h3>Solid</h3>
    <div className={styleRow}>
      <IconButton name="plus" />
      <IconButton name="plus" theme="danger" />
      <IconButton name="plus" disabled />
    </div>

    <h3>Ghost</h3>
    <div className={styleRow}>
      <IconButton name="plus" variant="ghost" />
      <IconButton name="plus" variant="ghost" theme="danger" />
      <IconButton name="plus" variant="ghost" disabled />
    </div>

    <h3>Bare</h3>
    <div className={styleRow}>
      <IconButton name="plus" variant="bare" />
      <IconButton name="plus" variant="bare" theme="danger" />
      <IconButton name="plus" variant="bare" disabled />
    </div>

    <h3>Size</h3>
    <div className={styleRow}>
      <IconButton name="plus" />
      <IconButton name="plus" size="small" />
    </div>
    <div className={styleRow}>
      <IconButton name="plus" variant="ghost" />
      <IconButton name="plus" variant="ghost" size="small" />
    </div>
    <div className={styleRow}>
      <IconButton name="plus" variant="bare" />
      <IconButton name="plus" variant="bare" size="small" />
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
