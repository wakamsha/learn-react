import { css } from '@emotion/css';
import { type ComponentProps, type MouseEvent } from 'react';
import { type SplitPane } from '.';
import { Duration } from '../../../constants/Style';
import { cssVar } from '../../../helpers/Style';

type ParentProps = ComponentProps<typeof SplitPane>;

type Props = Required<Pick<ParentProps, 'orientation'>> & {
  grabbed: boolean;
  onMouseDown: (event: MouseEvent<HTMLSpanElement>) => void;
  onMouseUp: (event: MouseEvent<HTMLSpanElement>) => void;
  onDoubleClick: (event: MouseEvent<HTMLSpanElement>) => void;
};

/**
 * Pane を分割する境界線を表現します。
 */
export const Splitter = ({ orientation, grabbed, onMouseDown, onMouseUp, onDoubleClick }: Props) => (
  <span
    role="separator"
    aria-orientation={orientation}
    aria-grabbed={grabbed}
    className={styleBase}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onDoubleClick={onDoubleClick}
  />
);

const size = 8;

const styleBase = css`
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  background: radial-gradient(at center center, rgb(0 0 0 / 24%) 0%, transparent 70%, transparent 100%) no-repeat;
  transition: background-position ${Duration.Fade} linear 0.2s;

  &[aria-orientation='horizontal'] {
    width: ${size}px;
    margin-left: -${size}px;
    cursor: col-resize;
    background-position: 10px 50%;
    background-size: 28px 100%;
    border-right: 1px solid ${cssVar('LineNeutral')};

    &:hover,
    &[aria-grabbed='true'] {
      background-position: 0 50%;
    }
  }

  &[aria-orientation='vertical'] {
    width: 100%;
    height: ${size}px;
    margin-top: -${size}px;
    cursor: row-resize;
    background-position: 0 10px;
    background-size: 100% 28px;
    border-bottom: 1px solid ${cssVar('LineNeutral')};

    &:hover,
    &[aria-grabbed='true'] {
      background-position: 0 0;
    }
  }

  &:hover,
  &[aria-grabbed='true'] {
    position: relative;
    z-index: 2;
    border-color: ${cssVar('LineNeutral')};
  }
`;
