import { Friend } from './Friend';
import { FriendList } from './FriendList';
import { PageTransition } from '../../components/PageTransition';
import { Route } from 'react-router-dom';
import React from 'react';

export const Friends = () => (
  <>
    <h1>Friends page</h1>
    <PageTransition>
      <Route path="/friends" component={FriendList} exact />
      <Route path="/friends/:id" component={Friend} />
    </PageTransition>
  </>
);

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
