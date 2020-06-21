import { FRIENDS } from '.';
import { Link } from 'react-router-dom';
import React from 'react';

export const FriendList = () => (
  <ul>
    {FRIENDS.map(friend => (
      <li key={friend.id}>
        <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
      </li>
    ))}
  </ul>
);
