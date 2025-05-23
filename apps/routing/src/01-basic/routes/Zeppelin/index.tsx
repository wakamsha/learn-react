import { css, cx } from '@emotion/css';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { generatePath, NavLink, Outlet, useLoaderData } from 'react-router';
import { routes } from '../../routes';
import { getZeppelin } from './data';

export async function clientLoader() {
  const zeppelin = await getZeppelin();

  return {
    zeppelin,
  };
}

/**
 * ツェッペリン メンバー一覧を列挙するページコンポーネントです。
 */
export const Zeppelin = () => {
  const { zeppelin } = useLoaderData<typeof clientLoader>();

  return (
    <div className={styleBase}>
      <h1 className={styleTitle}>🪽 Led Zeppelin</h1>

      <ul className={styleNavigation}>
        {zeppelin.map((member) => (
          <li key={member.id}>
            <NavLink
              to={generatePath(routes.ZeppelinMember, { member: member.id })}
              className={({ isActive }) => cx(styleLink, isActive && styleLinkActive)}
            >
              {member.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styleDetail}>
        <Outlet />
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
