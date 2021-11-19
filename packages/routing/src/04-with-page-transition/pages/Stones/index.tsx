import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { gutter } from '@learn-react/core/helpers/Style';
import { generatePath } from '@learn-react/core/helpers/URL';
import { Navigate, NavLink, Route } from 'react-router-dom';
import { Router } from '../../constants/Router';
import { Member } from './Member';

export const Stones = () => (
  <main className={styleBase}>
    <h1>The Rolling Stones</h1>

    <div className={styleContent}>
      <List />

      <PageTransition parentPath={Router.Stones.To}>
        <Route index element={<Navigate replace to="jagger" />} />
        <Route path={Router.StonesMember.Path} element={<Member />} />
      </PageTransition>
    </div>
  </main>
);

const styleBase = css`
  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;

const styleContent = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${gutter(4)};
`;

const List = () => (
  <ul>
    {memberData.map(({ id, nameJa }) => (
      <li key={id}>
        <NavLink
          to={generatePath(Router.StonesMember.To, { id })}
          style={({ isActive }) => ({ color: isActive ? 'red' : 'inherit' })}
        >
          {nameJa}
        </NavLink>
      </li>
    ))}
  </ul>
);

type MemberType = {
  id: string;
  nameJa: string;
  nameEn: string;
  family: string;
};

const memberData: MemberType[] = [
  {
    id: 'jagger',
    nameJa: 'ミック・ジャガー',
    nameEn: 'Mick Jagger',
    family: 'Vocal',
  },
  {
    id: 'richards',
    nameJa: 'キース・リチャーズ',
    nameEn: 'Keith Richards',
    family: 'Guitar',
  },
  {
    id: 'wood',
    nameJa: 'ロン・ウッド',
    nameEn: 'Ronnie Wood',
    family: 'Guitar',
  },
  {
    id: 'watts',
    nameJa: 'チャーリー・ワッツ',
    nameEn: 'Charlie Watts',
    family: 'Drum',
  },
];

export function getMemberById(id: string): MemberType | void {
  return memberData.find(f => f.id === id);
}
