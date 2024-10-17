import { css } from '@emotion/css';
import { gutter } from '@learn-react/core/src/helpers/Style';
import { generatePath, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Router } from '../../constants/Router';
import { Friend } from './Friend';
import { FriendData } from './data';

export const Friends = () => (
  <main className={styleBase}>
    <h1>Friends page</h1>

    <div className={styleContent}>
      <List />

      <Routes>
        {/*
         * `/friends` リンクから 入れ子ページに遷移（表示）したい場合は、
         * このように `Navigate` コンポーネントを element プロパティに渡せば OK。
         * v5 でいう `Redirect` に相当。
         */}
        <Route index element={<Navigate replace to={generatePath(Router.Friend.To, { id: 'serval' })} />} />
        <Route path={Router.Friend.Path} element={<Friend />} />
      </Routes>
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
    {FriendData.map(({ id, nameJa }) => (
      <li key={id}>
        <NavLink
          to={generatePath(Router.Friend.To, { id })}
          style={({ isActive }) => ({ color: isActive ? 'red' : 'inherit' })}
        >
          {nameJa}
        </NavLink>
      </li>
    ))}
  </ul>
);
