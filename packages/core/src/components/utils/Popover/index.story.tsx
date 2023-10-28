import { css } from '@emotion/css';
import { useState, type ComponentProps, type MouseEvent } from 'react';
import { Popover } from '.';
import { FontSize } from '../../../constants/Style';
import { cssVar, gutter } from '../../../helpers/Style';

export const Story = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<ComponentProps<typeof Popover>['position']>('top');
  const [alignment, setAlignment] = useState<ComponentProps<typeof Popover>['alignment']>('center');
  const [target, setTarget] = useState('top-start');

  const handleClickShow = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    const position = e.currentTarget.dataset.position as ComponentProps<typeof Popover>['position'];
    const alignment = e.currentTarget.dataset.alignment as ComponentProps<typeof Popover>['alignment'];

    setTarget(id);
    setPosition(position);
    setAlignment(alignment);
    setVisible(true);
  };

  return (
    <>
      <h2>Basic</h2>
      <div className={styleGrid}>
        <div className={styleAreaTopStart}>
          <button id="top-start" data-position="top" data-alignment="start" onClick={handleClickShow}>
            Top-Start
          </button>
        </div>
        <div className={styleAreaTopCenter}>
          <button id="top-center" data-position="top" data-alignment="center" onClick={handleClickShow}>
            Top-Center
          </button>
        </div>
        <div className={styleAreaTopEnd}>
          <button id="top-end" data-position="top" data-alignment="end" onClick={handleClickShow}>
            Top-End
          </button>
        </div>

        <div className={styleAreaLeftStart}>
          <button id="left-start" data-position="left" data-alignment="start" onClick={handleClickShow}>
            Left-Start
          </button>
        </div>
        <div className={styleAreaLeftCenter}>
          <button id="left-center" data-position="left" data-alignment="center" onClick={handleClickShow}>
            Left-Center
          </button>
        </div>
        <div className={styleAreaLeftEnd}>
          <button id="left-end" data-position="left" data-alignment="end" onClick={handleClickShow}>
            Left-End
          </button>
        </div>

        <div className={styleAreaRightStart}>
          <button id="right-start" data-position="right" data-alignment="start" onClick={handleClickShow}>
            Right-Start
          </button>
        </div>
        <div className={styleAreaRightCenter}>
          <button id="right-center" data-position="right" data-alignment="center" onClick={handleClickShow}>
            Right-Center
          </button>
        </div>
        <div className={styleAreaRightBottom}>
          <button id="right-end" data-position="right" data-alignment="end" onClick={handleClickShow}>
            Right-End
          </button>
        </div>

        <div className={styleAreaBottomStart}>
          <button id="bottom-start" data-position="bottom" data-alignment="start" onClick={handleClickShow}>
            Bottom-Start
          </button>
        </div>
        <div className={styleAreaBottomCenter}>
          <button id="bottom-center" data-position="bottom" data-alignment="center" onClick={handleClickShow}>
            Bottom-Center
          </button>
        </div>
        <div className={styleAreaBottomEnd}>
          <button id="bottom-end" data-position="bottom" data-alignment="end" onClick={handleClickShow}>
            Bottom-End
          </button>
        </div>
      </div>

      <Popover
        targetId={target}
        position={position}
        alignment={alignment}
        visible={visible}
        onClickOutside={() => {
          setVisible(false);
        }}
      >
        <div className={styleCard}>
          <p>
            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
          </p>
          <input />
          <button>Button</button>
        </div>
      </Popover>
    </>
  );
};

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

const styleCard = css`
  width: 280px;
  padding: ${gutter(4)};
  font-size: ${FontSize.Regular};
  background-color: ${cssVar('TexturePaper')};
  box-shadow: ${cssVar('ShadowFloating')};
`;
