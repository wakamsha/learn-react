/* eslint-disable react/no-children-prop */
import { css } from '@emotion/css';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

type Props = {
  label: string;
  to: string;
  activeOnlyWhenExact?: boolean;
};

const activeStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    display: 'block',
    marginRight: 8,
    content: `'>'`,
  },
});

export const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }: Props) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? activeStyle : ''}>
        <Link to={to}>{label}</Link>
      </div>
    )}
  />
);
