import { css } from 'emotion';
import { RouteComponentProps } from 'react-router';
import { getFriendById } from '../Friends';

type Params = {
  id: string;
};

type Props = RouteComponentProps<Params>;

const containerStyle = css({
  padding: 16,
  border: '1px solid',
});

export function Friend({
  match: {
    params: { id },
  },
}: Props) {
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
