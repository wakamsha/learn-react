import { css } from '@emotion/css';
import { useState } from 'react';
import { gutter, square } from '../../../helpers/Style';
import { Checkbox } from '../../inputs/Checkbox';
import { Icon } from '../Icon';
import { Tooltip } from '.';

export const Story = () => {
  const [disabled, setDisabled] = useState(false);

  const handleChangeDisabled = () => {
    setDisabled(b => !b);
  };

  return (
    <>
      <h3>Basic</h3>
      <Checkbox.Label label="Disabled">
        <Checkbox checked={disabled} onChange={handleChangeDisabled} />
      </Checkbox.Label>

      <div className={styleRow}>
        <button id="review-button" disabled={disabled}>
          新規レビュー
        </button>
      </div>
      <div className={styleRow}>
        <span className={styleIcon} id="trash-icon">
          <Icon name="trash" />
        </span>
        <span className={styleIcon} id="download-icon">
          <Icon name="download" />
        </span>
      </div>

      <Tooltip targetSelector="#review-button">
        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら
      </Tooltip>
      <Tooltip targetSelector="#trash-icon">削除します</Tooltip>
      <Tooltip targetSelector="#download-icon" offset={10}>
        ダウンロード
      </Tooltip>

      <hr />

      <h3>Positioned</h3>
      <table className={styleTable}>
        <tbody>
          <tr>
            <td />
            <td>
              <button id="top-start">Top-Start</button>
            </td>
            <td>
              <button id="top-center">Top-Center</button>
            </td>
            <td>
              <button id="top-end">Top-End</button>
            </td>
            <td />
          </tr>
          <tr>
            <td>
              <button id="left-start">Left-Start</button>
            </td>
            <td />
            <td />
            <td />
            <td>
              <button id="right-start">Right-Start</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="left-center">Left-Start</button>
            </td>
            <td />
            <td />
            <td />
            <td>
              <button id="right-center">Right-Start</button>
            </td>
          </tr>
          <tr>
            <td>
              <button id="left-end">Left-End</button>
            </td>
            <td />
            <td />
            <td />
            <td>
              <button id="right-end">Right-End</button>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button id="bottom-start">Bottom-Start</button>
            </td>
            <td>
              <button id="bottom-center">Bottom-Center</button>
            </td>
            <td>
              <button id="bottom-end">Bottom-End</button>
            </td>
            <td />
          </tr>
        </tbody>
      </table>

      <Tooltip targetSelector="#top-start" position="top" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#top-center" position="top" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#top-end" position="top" alignment="end">
        あのイーハトーヴォのすきとおった風
      </Tooltip>

      <Tooltip targetSelector="#left-start" position="left" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#left-center" position="left" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#left-end" position="left" alignment="end">
        あのイーハトーヴォのすきとおった風
      </Tooltip>

      <Tooltip targetSelector="#right-start" position="right" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#right-center" position="right" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#right-end" position="right" alignment="end">
        あのイーハトーヴォのすきとおった風
      </Tooltip>

      <Tooltip targetSelector="#bottom-start" position="bottom" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#bottom-center" position="bottom" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetSelector="#bottom-end" position="bottom" alignment="end">
        あのイーハトーヴォのすきとおった風
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

const styleTable = css`
  td {
    text-align: center;

    &:first-child {
      text-align: right;
    }

    &:last-child {
      text-align: left;
    }
  }
`;
