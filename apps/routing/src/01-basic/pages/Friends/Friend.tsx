import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { useParams } from 'react-router-dom';
import { getFriendById } from '.';

/**
 * フレンドの詳細情報を表示するページコンポーネントです。
 */
export const Friend = () => {
  const { id = '' } = useParams();

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

const styleBase = css`
  padding: ${gutter(4)};
  border: 1px solid;
`;
