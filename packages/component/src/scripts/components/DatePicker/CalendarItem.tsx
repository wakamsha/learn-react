import { css } from 'emotion';
import React from 'react';

type Props = {
  onClick: (value: Date) => void;
  value?: Date;
  active?: boolean;
  disabled?: boolean;
};

export const CalendarItem = ({ value, active, disabled, onClick }: Props) => {
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

const baseStyle = css({
  textAlign: 'center',
});

const itemStyle = css({
  display: 'inline-flex',
  width: 36,
  height: 36,
  borderRadius: '999rem',
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const clickableStyle = css({
  cursor: 'pointer',

  '&:hover': {
    background: 'lightgray',
  },
});

const activeStyle = css({
  color: 'white',
  cursor: 'default',

  '&, &:hover': {
    background: 'royalblue',
  },
});

const disabledStyle = css({
  color: 'lightgray',
  cursor: 'not-allowed',

  '&:hover': {
    background: 'transparent',
  },
});
