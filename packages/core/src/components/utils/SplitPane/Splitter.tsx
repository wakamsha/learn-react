import { css } from '@emotion/css';
import { MouseEvent } from 'react';
import { Duration } from '../../../constants/Style';
import { cssVar } from '../../../helpers/Style';

type Props = {
  grabbed: boolean;
  onMouseDown: (e: MouseEvent<HTMLSpanElement>) => void;
  onMouseUp: (e: MouseEvent<HTMLSpanElement>) => void;
};

export const Splitter = ({ grabbed, onMouseDown, onMouseUp }: Props) => (
  <span role="separator" aria-grabbed={grabbed} className={styleBase} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
);

const styleBase = css`
  flex: 0 0 auto;
  width: 8px;
  height: 100%;
  cursor: col-resize;
  background: radial-gradient(at center center, rgba(0, 0, 0, 0.24) 0%, transparent 70%, transparent 100%) no-repeat;
  background-position: 10px 50%;
  background-size: 28px 100%;
  border-right: 1px solid ${cssVar('LineNeutral')};
  transition: background-position ${Duration.Fade} linear 0.2s;

  &:hover,
  &[aria-grabbed='true'] {
    background-position: 0px 50%;
    border-color: ${cssVar('LineNeutral')};
  }
`;
