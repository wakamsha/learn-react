import * as React from 'react';
import { FRIENDS } from '../Friends';
import { Link, RouteProps } from 'react-router-dom';

type Props = {
  foo: string;
} & RouteProps;

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
