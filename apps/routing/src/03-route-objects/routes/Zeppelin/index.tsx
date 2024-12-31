import { css, cx } from '@emotion/css';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { generatePath, Navigate, NavLink, type RouteObject, useRoutes } from 'react-router';
import { data } from './data';
import { Member } from './Member';

/**
 * ツェッペリン メンバー一覧を列挙するページコンポーネントです。
 */
export const Zeppelin = () => {
  const routes: RouteObject[] = [
    {
      index: true,
      element: <Navigate replace to={generatePath('/zeppelin/:member', { member: 'jimmy-page' })} />,
    },
    {
      path: ':member',
      element: <Member />,
    },
  ];

  const element = useRoutes(routes);

  return (
    <div className={styleBase}>
      <h1 className={styleTitle}>🪽 Led Zeppelin</h1>

      <ul className={styleNavigation}>
        {data.map((member) => (
          <li key={member.id}>
            <NavLink
              to={generatePath('/zeppelin/:member', { member: member.id })}
              className={({ isActive }) => cx(styleLink, isActive && styleLinkActive)}
            >
              {member.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styleDetail}>{element}</div>
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
