import { css } from '@emotion/css';
import { PageTransition } from '@learn-react/core/components/utils/PageTransition';
import { gutter } from '@learn-react/core/helpers/Style';
import { Navigate, NavLink, Route } from 'react-router-dom';
import { Member } from './Member';

export const Stones = () => (
  <main className={styleBase}>
    <h1>The Rolling Stones</h1>

    <div className={styleContent}>
      <List />

      <PageTransition parentPath="stones">
        <Route index element={<Navigate replace to="jagger" />} />
        <Route path=":id" element={<Member />} />
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
    {memberData.map(member => (
      <li key={member.id}>
        <NavLink to={`/stones/${member.id}`} style={({ isActive }) => ({ color: isActive ? 'red' : 'inherit' })}>
          {member.nameJa}
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
