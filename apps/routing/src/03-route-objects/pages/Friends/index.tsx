import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { Link, Navigate, useRoutes, type RouteObject } from 'react-router-dom';
import { Friend } from './Friend';
import { FriendData } from './data';

export const Friends = () => {
  const routes: RouteObject[] = [
    {
      index: true,
      element: <Navigate replace to="/friends/serval" />,
    },
    {
      path: ':id',
      element: <Friend />,
    },
  ];

  const element = useRoutes(routes);

  return (
    <main className={styleBase}>
      <h1>Friends page</h1>
      <List />
      {element}
    </main>
  );
};

const styleBase = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;

const List = () => (
  <ul>
    {FriendData.map((friend) => (
      <li key={friend.id}>
        <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
      </li>
    ))}
  </ul>
);
