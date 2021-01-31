import { css } from '@emotion/css';
import { useState } from 'react';
import { gutter, square } from '../../../helpers/Style';
import { Button } from '../../inputs/Button';
import { Checkbox } from '../../inputs/Checkbox';
import { Icon } from '../Icon';
import { Tooltip } from '.';

export const Story = () => {
  const [disabled, setDisabled] = useState(false);
  const handleChangeDisabled = () => setDisabled(b => !b);

  return (
    <>
      <Checkbox.Label label="Disabled">
        <Checkbox checked={disabled} onChange={handleChangeDisabled} />
      </Checkbox.Label>

      <hr />

      <div className={styleRow}>
        <Button id="review-button" disabled={disabled}>
          新規レビュー
        </Button>
      </div>
      <div className={styleRow}>
        <span className={styleIcon} id="trash-icon">
          <Icon name="trash" />
        </span>
        <span className={styleIcon} id="download-icon">
          <Icon name="download" />
        </span>
      </div>
      <div className={styleRow}>
        <Button id="button-top">上に出ます</Button>
      </div>
      <div className={styleRow}>
        <Button id="button-right-top">上に出ます ( Right / Top )</Button>
      </div>
      <div className={styleRow}>
        <Button id="button-left-bottom">下に出ます ( Left / Bottom )</Button>
      </div>

      <Tooltip targetSelector="#review-button">
        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら
      </Tooltip>

      <Tooltip targetSelector="#trash-icon">削除します</Tooltip>

      <Tooltip targetSelector="#download-icon">ダウンロード</Tooltip>

      <Tooltip targetSelector="#button-top" position="top">
        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら
      </Tooltip>

      <Tooltip targetSelector="#button-right-top" position="top" alignment="end">
        すきとおった風
      </Tooltip>

      <Tooltip targetSelector="#button-left-bottom" position="bottom" alignment="start" offset={10}>
        すきとおった風
      </Tooltip>
    </>
  );
};

const styleRow = css`
  & + & {
    margin-top: ${gutter(4)};
  }
`;

const styleIcon = css`
  display: inline-block;
  margin: 0 ${gutter(2)};

  > svg {
    ${square(48)}
  }
`;
