import { Link, RouteComponentProps } from 'react-router-dom';
import { FRIENDS } from '../Friends';

type Props = {
  foo: string;
} & RouteComponentProps;

export function FriendList({ foo }: Props) {
  return (
    <>
      <p>{foo}</p>
      <ul>
        {FRIENDS.map(friend => (
          <li key={friend.id}>
            <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
