import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useParams } from 'react-router-dom';
import { FriendData } from './data';
import { type FriendType } from './type';

export const Friend = () => {
  const { id = '' } = useParams<{ id: string }>();

  const friend = getFriendById(id);

  if (!friend) {
    return <p>Friends with id {id} does not exist.</p>;
  }

  return (
    <article className={styleBase}>
      <h3>
        {friend.nameJa} <small>{friend.nameEn}</small>
      </h3>
      <p>{friend.family}</p>
    </article>
  );
};

function getFriendById(id: string): FriendType | undefined {
  return FriendData.find((f) => f.id === id);
}

const styleBase = css`
  padding: ${gutter(4)};
  border: 1px solid;
`;
