import { BorderRadius } from '@learn-react/core/constants/Style';
import { css } from 'emotion';
import { square } from '@learn-react/core/helpers/Style';
import React from 'react';

type Props = {
  onClick: (value: Date) => void;
  value?: Date;
  active?: boolean;
  disabled?: boolean;
};

export const Item = ({ value, active, disabled, onClick }: Props) => {
  const handleClick = () => value && !disabled && onClick(value);

  return (
    <td className={baseStyle}>
      <span
        className={`${itemStyle} ${value ? clickableStyle : ''} ${active ? activeStyle : ''} ${
          disabled ? disabledStyle : ''
        }`}
        onClick={handleClick}
      >
        {value?.getDate()}
      </span>
    </td>
  );
};

const baseStyle = css`
  text-align: center;
`;

const itemStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border-radius: ${BorderRadius.Circle};
  ${square('36px')}
`;

const clickableStyle = css`
  cursor: pointer;

  &:hover {
    background: lightgray;
  }
`;

const activeStyle = css`
  color: white;
  cursor: default;

  &,
  &:hover {
    background: royalblue;
  }
`;

const disabledStyle = css`
  color: lightgray;
  cursor: not-allowed;

  &:hover {
    background: transparent;
  }
`;
