import { FRIENDS } from '.';
import { css } from 'emotion';
import { useParams } from 'react-router-dom';
import React from 'react';

type Params = {
  id: string;
};

export const Friend = () => {
  const { id } = useParams<Params>();

  const friend = FRIENDS.find(f => f.id === id);

  return friend ? (
    <article className={containerStyle}>
      <h3>
        {friend.nameJa} <small>{friend.nameEn}</small>
      </h3>
      <p>{friend.family}</p>
    </article>
  ) : (
    <p>Friends with id {id} does not exist.</p>
  );
};

const containerStyle = css({
  padding: 16,
  border: '1px solid',
});
