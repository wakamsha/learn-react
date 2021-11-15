import { Route, Switch } from 'react-router';
import { Friend } from './friends/Friend';
import { FriendList } from './friends/FriendList';

type FriendType = {
  id: string;
  nameJa: string;
  nameEn: string;
  family: string;
};

export const FRIENDS: FriendType[] = [
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
  return FRIENDS.find(f => f.id === id);
}

export const Friends = () => (
  <main>
    <h1>Friends page</h1>
    <Switch>
      <Route path="/friends" render={props => <FriendList foo="value from props" {...props} />} exact />
      <Route path="/friends/:id" component={Friend} />
    </Switch>
  </main>
);
