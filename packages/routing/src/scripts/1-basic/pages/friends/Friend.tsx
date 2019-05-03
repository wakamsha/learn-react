import * as React from 'react';
import { css } from 'emotion';
import { getFriendById } from '../Friends';

type Props = {
  match: {
    params: {
      id: string;
    };
    url: string;
  };
};

const containerStyle = css({
  padding: 16,
  border: '1px solid',
});

export function Friend(props: Props) {
  const { id } = props.match.params;
  const friend = getFriendById(id);
  if (!friend) {
    return <p>Friends with id {id} does not exist.</p>;
  }
  return (
    <article className={containerStyle}>
      <h3>
        {friend.nameJa} <small>{friend.nameEn}</small>
      </h3>
      <p>{friend.family}</p>
    </article>
  );
}
