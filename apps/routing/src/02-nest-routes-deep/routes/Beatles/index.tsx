import { css, cx } from '@emotion/css';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { generatePath, Link, NavLink, Route, Routes } from 'react-router';
import { routes as rootRoutes } from '../../routes';
import { data } from './data';
import { Home } from './Home';
import { Member } from './Member';

/**
 * ビートルズメンバー一覧を列挙するページコンポーネントです。
 */
export const Beatles = () => {
  const routes = {
    To: `${rootRoutes.Beatles.To}/:member`,
    Path: '/:member',
  };

  return (
    <div className={styleBase}>
      <h1 className={styleTitle}>
        <Link to={rootRoutes.Beatles.To}>🍏 The Beatles</Link>
      </h1>

      <ul className={styleNavigation}>
        {data.map((member) => (
          <li key={member.id}>
            <NavLink
              to={generatePath(routes.To, { member: member.id })}
              className={({ isActive }) => cx(styleLink, isActive && styleLinkActive)}
            >
              {member.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styleDetail}>
        <Routes>
          <Route index element={<Home />} />
          <Route path={routes.Path} element={<Member />} />
        </Routes>
      </div>
    </div>
  );
};

const styleBase = css`
  display: grid;
  grid-template-areas:
    'title title'
    'navigation detail';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  gap: ${gutter(8)};
`;

const styleTitle = css`
  grid-area: title;
  font-size: ${FontSize.Large};
`;

const styleNavigation = css`
  display: flex;
  flex-direction: column;
  grid-area: navigation;
  gap: ${gutter(1)};
  margin: 0;
  list-style: none;
`;

const styleLink = css`
  display: block;
  padding: ${gutter(1)} ${gutter(2)};
`;

const styleLinkActive = css`
  font-weight: bold;
  color: ${cssVar('ThemeDangerNeutral')};
  pointer-events: none;
`;

const styleDetail = css`
  grid-area: detail;
`;
