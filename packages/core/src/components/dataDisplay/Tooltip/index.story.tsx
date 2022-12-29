import { css } from '@linaria/core';
import { useState } from 'react';
import { Tooltip } from '.';
import { FontSize } from '../../../constants/Style';
import { gutter, square } from '../../../helpers/Style';
import { Checkbox } from '../../inputs/Checkbox';
import { Icon } from '../Icon';

export const Story = () => {
  const [disabled, setDisabled] = useState(false);

  const handleChangeDisabled = () => {
    setDisabled(b => !b);
  };

  return (
    <>
      <h2>Basic</h2>
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

      <Tooltip targetId="review-button">あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら</Tooltip>
      <Tooltip targetId="trash-icon">削除します</Tooltip>
      <Tooltip targetId="download-icon" offset={10}>
        ダウンロード
      </Tooltip>

      <hr />

      <h2>Positioned</h2>
      <div className={styleGrid}>
        <div className={styleAreaTopStart}>
          <button id="top-start">Top-Start</button>
        </div>
        <div className={styleAreaTopCenter}>
          <button id="top-center">Top-Center</button>
        </div>
        <div className={styleAreaTopEnd}>
          <button id="top-end">Top-End</button>
        </div>

        <div className={styleAreaLeftStart}>
          <button id="left-start">Left-Start</button>
        </div>
        <div className={styleAreaLeftCenter}>
          <button id="left-center">Left-Center</button>
        </div>
        <div className={styleAreaLeftEnd}>
          <button id="left-end">Left-End</button>
        </div>

        <div className={styleAreaRightStart}>
          <button id="right-start">Right-Start</button>
        </div>
        <div className={styleAreaRightCenter}>
          <button id="right-center">Right-Center</button>
        </div>
        <div className={styleAreaRightBottom}>
          <button id="right-end">Right-End</button>
        </div>

        <div className={styleAreaBottomStart}>
          <button id="bottom-start">Bottom-Start</button>
        </div>
        <div className={styleAreaBottomCenter}>
          <button id="bottom-center">Bottom-Center</button>
        </div>
        <div className={styleAreaBottomEnd}>
          <button id="bottom-end">Bottom-End</button>
        </div>
      </div>

      <Tooltip targetId="top-start" position="top" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="top-center" position="top" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="top-end" position="top" alignment="end">
        あのイーハトーヴォのすきとおった風
      </Tooltip>

      <Tooltip targetId="left-start" position="left" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="left-center" position="left" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="left-end" position="left" alignment="end">
        あのイーハトーヴォのすきとおった風
      </Tooltip>

      <Tooltip targetId="right-start" position="right" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="right-center" position="right" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="right-end" position="right" alignment="end">
        あのイーハトーヴォのすきとおった風
      </Tooltip>

      <Tooltip targetId="bottom-start" position="bottom" alignment="start">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="bottom-center" position="bottom" alignment="center">
        あのイーハトーヴォのすきとおった風
      </Tooltip>
      <Tooltip targetId="bottom-end" position="bottom" alignment="end">
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

const styleGrid = css`
  display: grid;
  grid-template-areas:
    'a b c d e'
    'f g h i j'
    'k m n o p'
    'q r s t u'
    'v w x y z';
  gap: ${gutter(8)} ${gutter(2)};
  max-width: 480px;
  margin: auto;

  button {
    display: block;
    width: 100%;
    font-size: ${FontSize.Small};
  }
`;

const styleAreaTopStart = css`
  grid-area: b;
`;

const styleAreaTopCenter = css`
  grid-area: c;
`;

const styleAreaTopEnd = css`
  grid-area: d;
`;

const styleAreaLeftStart = css`
  grid-area: f;
`;

const styleAreaLeftCenter = css`
  grid-area: k;
`;

const styleAreaLeftEnd = css`
  grid-area: q;
`;

const styleAreaRightStart = css`
  grid-area: j;
`;

const styleAreaRightCenter = css`
  grid-area: p;
`;

const styleAreaRightBottom = css`
  grid-area: u;
`;

const styleAreaBottomStart = css`
  grid-area: w;
`;

const styleAreaBottomCenter = css`
  grid-area: x;
`;

const styleAreaBottomEnd = css`
  grid-area: y;
`;
