import { css } from '@emotion/css';
import { ReactNode, useMemo } from 'react';
import { Icon } from '../../../components/dataDisplay/Icon';
import { Tooltip } from '../../../components/dataDisplay/Tooltip';
import { Color, FontSize, IconSize } from '../../../constants/Style';
import { makeId } from '../../../helpers/String';
import { gutter, square } from '../../../helpers/Style';

type Props = {
  label: string;
  tooltip?: string;
} & XOR<
  {
    htmlFor: string;
  },
  {
    children: ReactNode;
  }
>;

export const FormLabel = ({ label, tooltip, htmlFor, children }: Props) => {
  const tooltipId = useMemo(() => makeId(), []);

  return (
    <label htmlFor={htmlFor} className={styleBase}>
      <span id={tooltipId} className={styleLabelText}>
        {label}

        {tooltip ? (
          <>
            <Icon name="information" />
            <Tooltip targetSelector={`#${tooltipId}`} alignment="start">
              {tooltip}
            </Tooltip>
          </>
        ) : null}
      </span>
      {children}
    </label>
  );
};

const styleBase = css`
  display: flex;
  flex-direction: column;
  gap: ${gutter(2)};
`;

const styleLabelText = css`
  display: inline-flex;
  gap: ${gutter(1)};
  align-items: center;
  width: -moz-fit-content;
  width: fit-content;
  font-size: ${FontSize.Small};
  color: ${Color.TextSub};

  > svg {
    ${square(IconSize.Regular)}
  }
`;
