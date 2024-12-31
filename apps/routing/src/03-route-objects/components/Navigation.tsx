import { css, cx } from '@emotion/css';
import { FontSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter } from '@learn-react/core/src/helpers/Style';
import { Link, NavLink } from 'react-router';

export const Navigation = () => {
  const navigationData = [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: '/zeppelin',
      label: 'Zeppelin',
    },
    {
      to: '/beatles',
      label: 'Beatles',
    },
  ];

  return (
    <div className={styleBase}>
      <h1 className={styleTitle}>
        <Link to="/about">About Routing</Link>
      </h1>

      <ul className={styleNavigation}>
        {navigationData.map(({ to, label }) => (
          <li key={to}>
            <NavLink className={({ isActive }) => cx(styleLink, isActive && styleLinkActive)} to={to}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styleBase = css`
  display: grid;
  grid-template-areas:
    'navigation'
    'title';
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const styleTitle = css`
  grid-area: title;
  padding: ${gutter(4)} ${gutter(2)};
  font-size: ${FontSize.Medium};
  font-weight: normal;
  text-align: center;
  border-top: 1px solid ${cssVar('LineLight')};
`;

const styleNavigation = css`
  display: flex;
  flex-direction: column;
  grid-area: navigation;
  gap: ${gutter(1)};
  padding: ${gutter(4)};
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
