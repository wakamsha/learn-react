import { Beatle } from './Beatle';
import { BeatleList } from './BeatleList';
import { PageTransition } from '../../components/PageTransition';
import { Route } from 'react-router-dom';
import { Router } from '../../../@core/constants/Router';
import React from 'react';

export const Beatles = () => (
  <>
    <h1>Beatles page</h1>
    <PageTransition>
      <Route path={Router.Paths.Beatles} component={BeatleList} exact />
      <Route path={Router.Paths.BeatleShow} component={Beatle} />
    </PageTransition>
  </>
);

type Beatle = {
  id: string;
  nameEn: string;
  nameJa: string;
  part: string;
};

export const BEATLES: Beatle[] = [
  {
    id: 'john',
    nameEn: 'John Lennon',
    nameJa: 'ジョン・レノン',
    part: 'Vocal, Guitar',
  },
  {
    id: 'paul',
    nameEn: 'Paul McCartney',
    nameJa: 'ポール・マッカトニー',
    part: 'Vocal, Bass',
  },
  {
    id: 'george',
    nameEn: 'George Harrison',
    nameJa: 'ジョージ・ハリスン',
    part: 'Vocal, Guitar',
  },
  {
    id: 'ringo',
    nameEn: 'Ringo Starr',
    nameJa: 'リンゴ・スター',
    part: 'Vocal, Drums',
  },
];
