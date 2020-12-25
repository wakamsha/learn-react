import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

type Props = {
  currentPath: string;
  handleClick: (path: string) => void;
};

const routes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/bubblegum',
    label: 'Bubblegum',
  },
  {
    path: '/shoelaces',
    label: 'Shoelaces',
  },
];

const baseStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

const activeStyle = css({
  background: 'black',
  '> a': {
    color: 'white',
    pointerEvents: 'none',
  },
});

export const Sidebar = (props: Props) => (
  <ul className={baseStyle}>
    {routes.map(route => (
      <li key={route.path} className={route.path === props.currentPath ? activeStyle : ''}>
        <Link to={route.path} onClick={() => props.handleClick(route.path)}>
          {route.label}
        </Link>
      </li>
    ))}
  </ul>
);
