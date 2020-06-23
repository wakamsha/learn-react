import { css } from 'emotion';
import React from 'react';

type Props = {
  onClick: (value: Date) => void;
  value?: Date;
  isActive?: boolean;
  isDisabled?: boolean;
};

export const CalendarItem = ({ value, isActive, isDisabled, onClick }: Props) => {
  const handleClick = () => value && !isDisabled && onClick(value);

  return (
    <td
      className={`${baseStyle} ${value ? clickableStyle : ''} ${isActive ? activeStyle : ''} ${
        isDisabled ? disabledStyle : ''
      }`}
      onClick={handleClick}
    >
      {value?.getDate()}
    </td>
  );
};

const baseStyle = css({
  width: 36,
  height: 36,
  borderRadius: '999rem',
  lineHeight: 1,
  textAlign: 'center',
});

const clickableStyle = css({
  cursor: 'pointer',

  '&:hover': {
    background: 'silver',
  },
});

const activeStyle = css({
  color: 'white',
  cursor: 'default',

  '&, &:hover': {
    background: 'blue',
  },
});

const disabledStyle = css({
  color: 'gray',
  cursor: 'not-allowed',
});
