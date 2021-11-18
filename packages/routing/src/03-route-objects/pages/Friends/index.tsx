import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/helpers/Style';
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { Friend } from './Friend';

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
    {FriendData.map(friend => (
      <li key={friend.id}>
        <Link to={`/friends/${friend.id}`}>{friend.nameJa}</Link>
      </li>
    ))}
  </ul>
);

type FriendType = {
  id: string;
  nameJa: string;
  nameEn: string;
  family: string;
};

const FriendData: FriendType[] = [
  {
    id: 'serval',
    nameJa: 'サーバル',
    nameEn: 'Serval Cat',
    family: 'ネコ目ネコ科ネコ属',
  },
  {
    id: 'raccoon',
    nameJa: 'アライグマ',
    nameEn: 'Common raccoon',
    family: 'ネコ目アライグマ科アライグマ属',
  },
  {
    id: 'fennec',
    nameJa: 'フェネック',
    nameEn: 'Fennec',
    family: 'ネコ目イヌ科キツネ属',
  },
];

export function getFriendById(id: string): FriendType | void {
  return FriendData.find(f => f.id === id);
}
